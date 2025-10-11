package com.speech_to_text.domain.port.in;

import com.speech_to_text.domain.model.User;

public interface SignupUseCase {
    int saveUser(User user);
}
