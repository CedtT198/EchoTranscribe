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
import com.speech_to_text.application.domain.model.DTO.UserFilterDto;
import com.speech_to_text.application.domain.model.DTO.UsersStatDTO;
import com.speech_to_text.application.domain.model.subscription.Subscription;
import com.speech_to_text.application.domain.model.user.User;
import com.speech_to_text.application.domain.port.out.UserRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.SubscriptionDocument;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserDocument;
import lombok.AllArgsConstructor;

interface SpringDataUser extends MongoRepository<UserDocument, String> {
    Optional<UserDocument> findByMail(String mail);
    Optional<UserDocument> findByAuth0Id(String auth0Id);
}

@Repository
@AllArgsConstructor
public class MongoUserRepository implements UserRepository {

    private SpringDataUser repo;
    private GenericMapper mapper;
    private final MongoTemplate mongoTemplate;

    
    @Override
    public UsersStatDTO getUsersDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception {
        Date start = Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date end = Date.from(endDate.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        MatchOperation match = Aggregation.match(
            Criteria.where("creationDate").gte(start).lt(end)
        );

        ProjectionOperation projectMonthYear = Aggregation.project()
            .and(
                DateOperators.dateOf("creationDate").toString("%B %Y")
            ).as("monthYear")
            .and("roles").as("roles");

        GroupOperation groupByMonth = Aggregation.group("monthYear").count().as("count");

        SortOperation sortByMonth = Aggregation.sort(Sort.Direction.ASC, "_id");

        FacetOperation facet = Aggregation.facet(
            Aggregation.count().as("count")
        ).as("totalUsers")

        .and(
            projectMonthYear,
            groupByMonth,
            sortByMonth
        ).as("usersPerMonth");

        Aggregation aggregation = Aggregation.newAggregation(match, facet);
        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "user", Document.class);

        return mapToDTO(results.getUniqueMappedResult());
    }


    private UsersStatDTO mapToDTO(Document doc) {
        UsersStatDTO dto = new UsersStatDTO();

        List<Document> total = (List<Document>) doc.get("totalUsers");
        if (!total.isEmpty()) {
            dto.setTotalUsers(total.get(0).getInteger("count"));
        }

        List<Document> perMonth = doc.getList("usersPerMonth", Document.class);

        List<MonthlyCountDTO> months = perMonth.stream().map(d -> {
            MonthlyCountDTO m = new MonthlyCountDTO();
            m.setMonthYear(d.getString("_id"));
            m.setCount(d.getInteger("count").doubleValue());
            return m;
        }).toList();

        dto.setUsers(months);

        return dto;
    }
    
    
    @Override
    public Page<User> findByFilters(UserFilterDto filter, Pageable pageable) {
        List<Criteria> criteriaList = new ArrayList<>();

        String name = filter.getName();
        if (name != null && !name.trim().isEmpty()) {
            criteriaList.add(Criteria.where("name").regex(name, "i"));
        }
        
        String firstname = filter.getFirstName();
        if (firstname != null && !firstname.trim().isEmpty()) {
            criteriaList.add(Criteria.where("firstname").regex(firstname, "i"));
        }

        String mail = filter.getMail();
        if (mail != null && !mail.trim().isEmpty()) {
            criteriaList.add(Criteria.where("mail").regex(mail, "i"));
        }

        LocalDate startDate = filter.getStartDate();
        if (startDate != null) {
            criteriaList.add(Criteria.where("creationDate").gte(startDate.atStartOfDay()));
        }

        LocalDate endDate = filter.getEndDate();
        if (endDate != null) {
            criteriaList.add(Criteria.where("creationDate").lte(endDate.plusDays(1).atStartOfDay().minusNanos(1)));
        }

        String country = filter.getCountry();
        if (country != null && !country.trim().isEmpty()) {
            criteriaList.add(Criteria.where("country").is(country));
        }
        
        Query query = new Query();
        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        long total = mongoTemplate.count(query, UserDocument.class);
        query.with(pageable);

        List<UserDocument> content = mongoTemplate.find(query, UserDocument.class);

        List<User> list = mapper.mapList(content, User.class);
        return new PageImpl<>(list, pageable, total);
    }


    @Override
    public User findByAuth0Id(String auth0Id) {
        UserDocument userDoc =  repo.findByAuth0Id(auth0Id).orElse(null);
        return mapper.map(userDoc, User.class);
    }    

    @Override
    public List<User> findAll() {
        return mapper.mapList(repo.findAll(), User.class);
        // return repo.findAll().stream().map(mapper::toDomain).toList();
    }

    @Override
    public List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByAbonnements'");
    }

    @Override
    public User findById(String id) {;
        UserDocument userDoc =  repo.findById(id).orElse(null);
        return mapper.map(userDoc, User.class);
    }

    @Override
    public User findByMail(String mail) {
        UserDocument userDoc =  repo.findByMail(mail).orElse(null);
        return mapper.map(userDoc, User.class);
    }

    @Override
    public boolean delete(String auth0Id) {
        Optional<UserDocument> existing = repo.findByAuth0Id(auth0Id);
        if (existing.isPresent()) {
            repo.delete(existing.get());
            return true;
        }
        return false;
    }
    
    @Override
    public User update(User user) {
        UserDocument existing = repo.findByAuth0Id(user.getAuth0Id()).orElse(null);
        if (existing == null) {
            return null;
        }
        return save(user);
    }

    @Override
    public User save(User user) {
        UserDocument doc = mapper.map(user, UserDocument.class);
        return mapper.map(repo.save(doc), User.class);
    }
}
