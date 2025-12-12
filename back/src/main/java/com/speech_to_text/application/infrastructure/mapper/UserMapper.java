package com.speech_to_text.application.infrastructure.mapper;

import org.springframework.stereotype.Component;

// import org.mapstruct.Mapper;
import com.speech_to_text.application.domain.model.User;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserDocument;

// @Mapper(componentModel = "spring")
// public interface UserMapper {
//     User toDomain(UserDocument doc);
//     UserDocument toDocument(User user);
// }

@Component
public class UserMapper {
    public User toDomain(UserDocument doc) {
        if (doc == null) {
            return null;
        }

        User user = new User();
        user.setId(doc.getId());
        user.setName(doc.getName());
        user.setFirst_name(doc.getFirst_name());
        user.setBirthday(doc.getBirthday());
        user.setMail(doc.getMail());
        user.setAddress(doc.getAddress());
        user.setCountry(doc.getCountry());
        user.setCity(doc.getCity());
        user.setZip(doc.getZip());
        user.setPassword(doc.getPassword());
        user.setCreation_date(doc.getCreation_date());
        user.setRole(doc.getRole());

        return user;
    }

    public UserDocument toDocument(User user) {
        if (user == null) {
            return null;
        }

        UserDocument doc = new UserDocument();
        doc.setId(user.getId());
        doc.setName(user.getName());
        doc.setFirst_name(user.getFirst_name());
        doc.setBirthday(user.getBirthday());
        doc.setMail(user.getMail());
        doc.setAddress(user.getAddress());
        user.setCountry(doc.getCountry());
        doc.setCity(user.getCity());
        doc.setZip(user.getZip());
        doc.setPassword(user.getPassword());
        doc.setCreation_date(user.getCreation_date());
        doc.setRole(user.getRole());

        return doc;
    }
}
