package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.QA;
import com.speech_to_text.application.domain.port.out.QARepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.QADocument;

import lombok.AllArgsConstructor;

interface SpringDataQA extends MongoRepository<QADocument, String> {
    Optional<List<QADocument>> findByAbout(String about);
}

@Repository
@AllArgsConstructor
public class MongoQARepository implements QARepository {

    private final SpringDataQA repo;
    private GenericMapper mapper;

    @Override
    public List<QA> findAll() {
        return mapper.mapList(repo.findAll(), QA.class);
    }

    @Override
    public List<QA> findAllAbout(String about) {
        List<QADocument> qaDocList =  repo.findByAbout(about).orElse(null);
        return mapper.mapList(qaDocList, QA.class);
    }
}
