package com.speech_to_text.application.domain.port.in;

import com.speech_to_text.application.domain.model.user.User;

public interface SignUseCase {
    User checkLogin(String mail, String password) throws Exception;
}
