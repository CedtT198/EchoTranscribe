package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.SubscriptionType;
import com.speech_to_text.application.domain.port.out.SubscriptionTypeRepository;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.SubscriptionTypeDocument;
import com.speech_to_text.application.infrastructure.mapper.UserMapper;

import lombok.AllArgsConstructor;

// interface SpringDataUser extends MongoRepository<UserDocument, String> {
//     Optional<UserDocument> findByMail(String mail);
// }

interface SpringDataSubType extends MongoRepository<SubscriptionTypeDocument, String> {}

@Repository
@AllArgsConstructor
public class MongoSubscriptionTypeRepository implements SubscriptionTypeRepository {

    private final SpringDataSubType repo;
    private UserMapper mapper;

    @Override
    public List<SubscriptionType> findAll() {
        // return repo.findAll().stream().map(mapper::toDomain).toList();
        return null;
    }
}
