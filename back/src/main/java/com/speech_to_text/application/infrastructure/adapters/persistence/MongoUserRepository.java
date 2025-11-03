package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.speech_to_text.application.domain.port.out.UserRepository;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserEntity;

interface SpringDataUser extends MongoRepository<UserEntity, String> {
    Optional<UserEntity> findByMail(String mail);
}

@Repository
public class MongoUserRepository implements UserRepository{

    private final SpringDataUser repo;

    public MongoUserRepository(SpringDataUser repo) {
        this.repo = repo;
    }

    @Override
    public List<UserEntity> findAll() {
        return repo.findAll();
    }

    @Override
    public List<UserEntity> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByAbonnements'");
    }

    @Override
    public UserEntity findById(String id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public UserEntity findByMail(String mail) {
        return repo.findByMail(mail).orElse(null);
    }

    @Override
    public UserEntity save(UserEntity user) {
        return repo.save(user);
    }    
}
