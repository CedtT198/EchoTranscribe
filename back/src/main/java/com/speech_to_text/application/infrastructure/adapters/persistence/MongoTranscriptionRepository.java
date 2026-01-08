package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
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
    public List<Transcription> findAll() {
        return mapper.mapList(repo.findAll(), Transcription.class);
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
