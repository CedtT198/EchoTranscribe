package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.bson.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.aggregation.DateOperators;
import org.springframework.data.mongodb.core.aggregation.FacetOperation;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.DTO.MonthlyCountDTO;
import com.speech_to_text.application.domain.model.DTO.SalesStatDTO;
import com.speech_to_text.application.domain.model.DTO.SubscriptionFilterDto;
import com.speech_to_text.application.domain.model.DTO.SubscriptionRepartitionDTO;
import com.speech_to_text.application.domain.model.subscription.Subscription;
import com.speech_to_text.application.domain.port.out.SubscriptionRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.SubscriptionDocument;
import lombok.AllArgsConstructor;

interface SpringDataSubscription extends MongoRepository<SubscriptionDocument, String> {
    Page<SubscriptionDocument> findAllByAuth0Id(String auth0Id, Pageable page);
    List<SubscriptionDocument> findBySubscriptionOwner(String subOwner);
    Optional<SubscriptionDocument> findByInvitationCode(String code);
    Optional<List<SubscriptionDocument>> findByAuth0IdOrderByPurchaseDateDesc(String auth0Id);
    // Optional<SubscriptionDocument> findFirstByAuth0IdAndStatusOrderByPurchaseDateDesc(String auth0Id, String status);
}

@Repository
@AllArgsConstructor
public class MongoSubscriptionRepository implements SubscriptionRepository{

    private SpringDataSubscription repo;
    private GenericMapper mapper;
    private final MongoTemplate mongoTemplate;

    
    @Override
    public Page<Subscription> findByFilters(SubscriptionFilterDto filter, Pageable pageable) {
        List<Criteria> criteriaList = new ArrayList<>();

        String mail = filter.getMail();
        if (mail != null && !mail.trim().isEmpty()) {
            criteriaList.add(Criteria.where("mail").regex(mail, "i"));
        }

        LocalDate startDate = filter.getStartDate();
        if (startDate != null) {
            criteriaList.add(Criteria.where("purchaseDate").gte(startDate.atStartOfDay()));
        }

        LocalDate endDate = filter.getEndDate();
        if (endDate != null) {
            criteriaList.add(Criteria.where("purchaseDate").lte(endDate.plusDays(1).atStartOfDay().minusNanos(1)));
        }

        String subscriptionType = filter.getSubscriptionType();
        if (subscriptionType != null && !subscriptionType.trim().isEmpty()) {
            criteriaList.add(Criteria.where("subscriptionType").is(subscriptionType));
        }
        
        String status = filter.getStatus();
        if (status != null && !status.trim().isEmpty()) {
            criteriaList.add(Criteria.where("status").is(status));
        }

        Query query = new Query();
        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        long total = mongoTemplate.count(query, SubscriptionDocument.class);
        query.with(pageable);

        List<SubscriptionDocument> content = mongoTemplate.find(query, SubscriptionDocument.class);

        List<Subscription> list = mapper.mapList(content, Subscription.class);
        return new PageImpl<>(list, pageable, total);
    }

    
    @Override
    public SalesStatDTO getSalesDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception {
        Date start = Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date end = Date.from(endDate.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        MatchOperation match = Aggregation.match(
            Criteria.where("purchaseDate").gte(start).lt(end)
        );

        ProjectionOperation projectMonthYear = Aggregation.project()
            .and(
                DateOperators.dateOf("purchaseDate").toString("%B %Y")
            ).as("monthYear")
            .and("price").as("price")
            .and("status").as("status");

        GroupOperation groupByMonth = Aggregation.group("monthYear")
            .sum("price").as("count")
            .avg("price").as("averageMonthlySales");

        SortOperation sortByMonth = Aggregation.sort(Sort.Direction.ASC, "_id");

        FacetOperation facet = Aggregation.facet(
            Aggregation.group().sum("price").as("allTimeSales")
        ).as("allTimeSales")

        .and(
            Aggregation.group()
                .sum(
                    ConditionalOperators.when(
                        Criteria.where("status").is("CANCEL_AT_PERIOD_END")
                    ).then(1).otherwise(0)
                ).as("churn")
        ).as("churn")

        .and(
            projectMonthYear,
            groupByMonth,
            sortByMonth
        ).as("subscriptionsPerMonth")
        
        .and(
            Aggregation.match(
                Criteria.where("subscriptionType").in("Free plan", "Pro", "Company")
            ),
            Aggregation.group("subscriptionType").count().as("count")
        ).as("subscriptionsRepartition");

        Aggregation aggregation = Aggregation.newAggregation(match, facet);
        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "subscription", Document.class);

        return mapToDTO(results.getUniqueMappedResult());
    }


    private SalesStatDTO mapToDTO(Document doc) {
        SalesStatDTO dto = new SalesStatDTO();

        List<Document> allTime = (List<Document>) doc.get("allTimeSales");
        if (!allTime.isEmpty()) {
            dto.setAllTimeSales(allTime.get(0).getDouble("allTimeSales"));
        }

        List<Document> churn = (List<Document>) doc.get("churn");
        if (!churn.isEmpty()) {
            dto.setAverageChurn(churn.get(0).getInteger("churn").doubleValue());
        }

        List<Document> perMonth = doc.getList("subscriptionsPerMonth", Document.class);

        List<MonthlyCountDTO> months = perMonth.stream().map(d -> {
            MonthlyCountDTO m = new MonthlyCountDTO();
            m.setMonthYear(d.getString("_id"));
            m.setCount(d.getDouble("count"));
            return m;
        }).toList();
        dto.setSubscriptions(months);


        List<Document> repartition = doc.getList("subscriptionsRepartition", Document.class);
        Map<String, Integer> counts = new LinkedHashMap<>();
        counts.put("Free plan", 0);
        counts.put("Pro", 0);
        counts.put("Company", 0);

        if (repartition != null) {
            for (Document d : repartition) {
                String type = d.getString("_id");
                Integer count = d.getInteger("count");
                if (counts.containsKey(type)) {
                    counts.put(type, count);
                }
            }
        }

        int total = counts.values().stream().mapToInt(Integer::intValue).sum();
        List<SubscriptionRepartitionDTO> repartitions = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {

            SubscriptionRepartitionDTO r = new SubscriptionRepartitionDTO();
            r.setSubscription(entry.getKey());

            double percentage = total == 0 ? 0 : (entry.getValue() * 100.0) / total;
            r.setValue(Math.round(percentage * 10.0) / 10.0);

            repartitions.add(r);
        }
        dto.setSubscriptionsRepartition(repartitions);


        double avgMonthly = perMonth.stream()
            .mapToDouble(d -> d.getDouble("averageMonthlySales"))
            .average()
            .orElse(0);

        dto.setAverageMonthlySales(avgMonthly);
        return dto;
    }
    


    @Override
    public List<Subscription> findByOwner(String subOwner) {
        List<SubscriptionDocument> subDocList =  repo.findBySubscriptionOwner(subOwner);
        return mapper.mapList(subDocList, Subscription.class);
    }

	@Override
	public Page<Subscription> findAllByAuth0Id(String auth0id, Pageable pageable) {
        Page<SubscriptionDocument> documentPage = repo.findAllByAuth0Id(auth0id, pageable);
        List<Subscription> transcriptionList = mapper.mapList(documentPage.getContent(), Subscription.class);

        return new PageImpl<>(transcriptionList, pageable, documentPage.getTotalElements());
	}

    @Override
    public List<Subscription> findAllByAuth0Id(String auth0id) {
        List<SubscriptionDocument> subDocList =  repo.findByAuth0IdOrderByPurchaseDateDesc(auth0id).orElse(null);
        return mapper.mapList(subDocList, Subscription.class);
    }
    
    @Override
    public Subscription findByCode(String code) {
        SubscriptionDocument doc =  repo.findByInvitationCode(code).orElse(null);
        return mapper.map(doc, Subscription.class);
    }

    @Override
    public List<Subscription> findAll() {
        return mapper.mapList(repo.findAll(), Subscription.class);
    }
    
    @Override
    public Subscription update(Subscription sub) {
        SubscriptionDocument existing = repo.findById(sub.getId()).orElse(null);
        if (existing == null) {
            return null;
        }
        return save(sub);
    }
    
    @Override
    public List<Subscription> cancelAtPeriodEnd(String id, LocalDate endPeriod) {
        SubscriptionDocument existing = repo.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        List<SubscriptionDocument> subs = repo.findBySubscriptionOwner(existing.getSubscriptionOwner());
        if (subs.isEmpty()) {
            subs  = List.of();
        }

        subs.forEach(sub -> {
            sub.setStatus("CANCEL_AT_PERIOD_END");
            sub.setEndDate(endPeriod);
        });
        return repo.saveAll(subs)
            .stream()
            .map(doc -> mapper.map(doc, Subscription.class))
            .toList();
    }

    @Override
    public List<Subscription> canceled(String id) {
        SubscriptionDocument existing = repo.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        List<SubscriptionDocument> subs = repo.findBySubscriptionOwner(existing.getSubscriptionOwner());
        if (subs.isEmpty()) {
            subs  = List.of();
        }

        subs.forEach(sub -> { sub.setStatus("CANCELED"); });
        return repo.saveAll(subs)
            .stream()
            .map(doc -> mapper.map(doc, Subscription.class))
            .toList();
    }

    @Override
    public Subscription save(Subscription sub) {
        SubscriptionDocument doc = mapper.map(sub, SubscriptionDocument.class);
        return mapper.map(repo.save(doc), Subscription.class);
    }

}
