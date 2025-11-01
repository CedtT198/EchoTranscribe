package com.speech_to_text.domain.port.in;

import com.speech_to_text.domain.model.User;

public interface SignUseCase {
    User checkLogin(String mail, String password) throws Exception;
    User addUser(User user) throws Exception;
}
