package com.speech_to_text.infrastructure.adapters.out;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.domain.model.User;
import com.speech_to_text.domain.port.out.UserRepository;

interface SpringDataUser extends MongoRepository<User, String> {
    Optional<User> findByMail(String mail);
}

@Repository
public class MongoUserRepository implements UserRepository{

    private final SpringDataUser repo;

    public MongoUserRepository(SpringDataUser repo) {
        this.repo = repo;
    }

    @Override
    public List<User> findAll() {
        return repo.findAll();
    }

    @Override
    public List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByAbonnements'");
    }

    @Override
    public User findById(String id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public User findByMail(String mail) {
        return repo.findByMail(mail).orElse(null);
    }

    @Override
    public User save(User user) {
        return repo.save(user);
    }    
}
