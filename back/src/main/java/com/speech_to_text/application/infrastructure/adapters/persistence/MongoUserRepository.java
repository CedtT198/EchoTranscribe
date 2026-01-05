package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.user.User;
import com.speech_to_text.application.domain.port.out.UserRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserDocument;
import lombok.AllArgsConstructor;

interface SpringDataUser extends MongoRepository<UserDocument, String> {
    Optional<UserDocument> findByMail(String mail);
    Optional<UserDocument> findByAuth0Id(String auth0Id);
}

@Repository
@AllArgsConstructor
public class MongoUserRepository implements UserRepository{

    private SpringDataUser repo;
    // private UserMapper mapper;
    private GenericMapper mapper;

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
