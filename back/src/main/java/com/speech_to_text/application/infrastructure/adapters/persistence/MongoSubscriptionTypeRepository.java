package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.speech_to_text.application.domain.model.subscription.SubscriptionType;
import com.speech_to_text.application.domain.port.out.SubscriptionTypeRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.SubscriptionTypeDocument;

import lombok.AllArgsConstructor;

interface SpringDataSubType extends MongoRepository<SubscriptionTypeDocument, String> {}

@Repository
@AllArgsConstructor
public class MongoSubscriptionTypeRepository implements SubscriptionTypeRepository {

    private final SpringDataSubType repo;
    private GenericMapper mapper;

    @Override
    public List<SubscriptionType> findAll() {
        return mapper.mapList(repo.findAll(), SubscriptionType.class);
    }
}
