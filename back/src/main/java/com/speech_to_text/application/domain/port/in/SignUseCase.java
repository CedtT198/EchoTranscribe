package com.speech_to_text.application.domain.port.in;

import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserEntity;

public interface SignUseCase {
    UserEntity checkLogin(String mail, String password) throws Exception;
}
