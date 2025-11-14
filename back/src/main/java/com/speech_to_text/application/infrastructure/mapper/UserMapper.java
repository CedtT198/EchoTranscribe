package com.speech_to_text.application.infrastructure.mapper;

import org.mapstruct.Mapper;
import com.speech_to_text.application.domain.model.User;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserDocument;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toDomain(UserDocument doc);
    UserDocument toDocument(User user);
}
