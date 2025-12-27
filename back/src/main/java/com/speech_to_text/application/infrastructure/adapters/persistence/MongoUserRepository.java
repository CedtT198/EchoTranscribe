package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.User;
import com.speech_to_text.application.domain.port.out.UserRepository;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserDocument;
// import com.speech_to_text.application.infrastructure.mapper.BaseMapper;
import com.speech_to_text.application.infrastructure.mapper.GenericMapper;

import lombok.AllArgsConstructor;

interface SpringDataUser extends MongoRepository<UserDocument, String> {
    Optional<UserDocument> findByMail(String mail);
}

@Repository
@AllArgsConstructor
public class MongoUserRepository implements UserRepository{

    private SpringDataUser repo;
    // private UserMapper mapper;
    private GenericMapper mapper;

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
    public User save(User user) {
        UserDocument doc = mapper.map(user, UserDocument.class);
        return mapper.map(repo.save(doc), User.class);
    }    
}
