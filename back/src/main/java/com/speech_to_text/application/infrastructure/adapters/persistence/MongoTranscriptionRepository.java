package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.bson.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
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
import com.speech_to_text.application.domain.model.DTO.PerformanceStatDTO;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.out.TranscriptionRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.TranscriptionDocument;
import lombok.AllArgsConstructor;

interface SpringDataTranscription extends MongoRepository<TranscriptionDocument, String> {
    Page<TranscriptionDocument> findAllByAuth0Id(String auth0Id, Pageable pageable);
    // Optional<TranscriptionDocument> findByAuth0IdAndType(String auth0Id, String transcribeType);
}

@Repository
@AllArgsConstructor
public class MongoTranscriptionRepository implements TranscriptionRepository {

    private SpringDataTranscription repo;
    private GenericMapper mapper;
    private final MongoTemplate mongoTemplate;

    @Override
    public double getTotalHoursTranscribed(LocalDate startDate, LocalDate endDate) {
        MatchOperation match = Aggregation.match(
            Criteria.where("creationDate").gte(startDate).lte(endDate)
        );

        GroupOperation group = Aggregation.group().sum("fileDuration").as("totalDuration");

        Aggregation aggregation = Aggregation.newAggregation(match, group);

        AggregationResults<Document> results =
            mongoTemplate.aggregate(
                aggregation,
                TranscriptionDocument.class,
                Document.class
            );

        Document result = results.getUniqueMappedResult();

        return result != null ? result.getInteger("totalDuration")/3600.0 : 0.0;
    }
    
    @Override
    public List<Transcription> findAll() {
        return mapper.mapList(repo.findAll(), Transcription.class);
    }

    
    @Override
    public PerformanceStatDTO getPerfDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception {
        Date start = Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date end = Date.from(endDate.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        
        ProjectionOperation projectMonthYear = Aggregation.project()
            .and(
                DateOperators.dateOf("creationDate").toString("%B %Y")
            ).as("monthYear");
        GroupOperation groupByMonth = Aggregation.group("monthYear").count().as("count");
        SortOperation sortByMonth = Aggregation.sort(Sort.Direction.ASC, "_id");

        MatchOperation match = Aggregation.match(
            Criteria.where("creationDate").gte(start).lt(end)
        );

        FacetOperation facet = Aggregation.facet(
            // Langage le plus utilisé
            Aggregation.group("language").count().as("count"),
            Aggregation.sort(Sort.by(Sort.Direction.DESC, "count")),
            Aggregation.limit(1)
        ).as("mostUsedLanguage")

        .and(
            // Durée totale
            Aggregation.group().sum("fileDuration").as("totalSeconds")
        ).as("totalDuration")

        .and(
            // Total transcriptions
            Aggregation.count().as("count")
        ).as("totalTranscriptions")

        .and(
                // Par mois (FIX)
                projectMonthYear,
                groupByMonth,
                sortByMonth
        ).as("transcriptionsPerMonth");

        Aggregation aggregation = Aggregation.newAggregation(match, facet);

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "transcription", Document.class);

        Document doc = results.getUniqueMappedResult();

        return mapToDTO(doc);
    }


    private PerformanceStatDTO mapToDTO(Document doc) {

        PerformanceStatDTO dto = new PerformanceStatDTO();

        // Langage
        List<Document> lang = (List<Document>) doc.get("mostUsedLanguage");
        if (!lang.isEmpty()) {
            dto.setMostUsedLanguage(lang.get(0).getString("_id"));
        }

        // Total heures
        List<Document> duration = (List<Document>) doc.get("totalDuration");
        if (!duration.isEmpty()) {
            Double hours = duration.get(0).getInteger("totalSeconds") / 3600.0;
            hours = Math.round(hours * 10.0) / 10.0;
            // Double hours = duration.get(0).getInteger("totalSeconds") / 1.0;
            dto.setTotalHoursTranscribed(hours);
        }

        // Total transcriptions
        List<Document> total = (List<Document>) doc.get("totalTranscriptions");
        if (!total.isEmpty()) {
            dto.setTotalTranscriptions(total.get(0).getInteger("count"));
        }

        // Par mois
        List<Document> perMonth = doc.getList("transcriptionsPerMonth", Document.class);
        List<MonthlyCountDTO> months = perMonth.stream().map(d -> {
            MonthlyCountDTO m = new MonthlyCountDTO();
            m.setMonthYear(d.getString("_id"));
            m.setCount(d.getInteger("count").doubleValue());
            return m;
        }).toList();

        dto.setTranscriptions(months);
        return dto;
    }



    @Override
    public Page<Transcription> findByFilters(String auth0Id, LocalDate startDate, LocalDate endDate, String contentPhrase, String summaryPhrase, String transcriptionType, Pageable pageable) {
        List<Criteria> criteriaList = new ArrayList<>();

        if (auth0Id != null && !auth0Id.trim().isEmpty()) {
            criteriaList.add(Criteria.where("auth0Id").is(auth0Id));
        }

        if (startDate != null) {
            criteriaList.add(Criteria.where("creationDate").gte(startDate.atStartOfDay()));
        }

        if (endDate != null) {
            criteriaList.add(Criteria.where("creationDate").lte(endDate.plusDays(1).atStartOfDay().minusNanos(1)));
        }

        if (contentPhrase != null && !contentPhrase.trim().isEmpty()) {
            criteriaList.add(Criteria.where("content").regex(contentPhrase.trim(), "i"));
        }

        if (summaryPhrase != null && !summaryPhrase.trim().isEmpty()) {
            criteriaList.add(Criteria.where("summary").regex(summaryPhrase.trim(), "i"));
        }

        if (transcriptionType != null && !transcriptionType.trim().isEmpty()) {
            criteriaList.add(Criteria.where("transcriptionType").is(transcriptionType));
        }

        Query query = new Query();
        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        long total = mongoTemplate.count(query, TranscriptionDocument.class);
        query.with(pageable);

        List<TranscriptionDocument> content = mongoTemplate.find(query, TranscriptionDocument.class);

        List<Transcription> transcriptionList = mapper.mapList(content, Transcription.class);
        return new PageImpl<>(transcriptionList, pageable, total);
    }


    @Override
    public Page<Transcription> findAllByAuth0Id(String auth0Id, Pageable pageable) {
        Page<TranscriptionDocument> documentPage = repo.findAllByAuth0Id(auth0Id, pageable);
        List<Transcription> transcriptionList = mapper.mapList(documentPage.getContent(), Transcription.class);

        return new PageImpl<>(transcriptionList, pageable, documentPage.getTotalElements());
    }


    @Override
    public Transcription save(Transcription transcription) {
        TranscriptionDocument doc = mapper.map(transcription, TranscriptionDocument.class);
        return mapper.map(repo.save(doc), Transcription.class);
    }


    @Override
    public Transcription update(Transcription transcription) {
        TranscriptionDocument existing = repo.findById(transcription.getId()).orElse(null);
        if (existing == null) {
            return null;
        }
        return save(transcription);
    }


    @Override
    public boolean delete(String id) {
        Optional<TranscriptionDocument> existing = repo.findById(id);
        if (existing.isPresent()) {
            repo.delete(existing.get());
            return true;
        }
        return false;
    }
}
