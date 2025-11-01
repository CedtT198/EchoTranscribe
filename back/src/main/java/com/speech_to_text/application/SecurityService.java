package com.speech_to_text.application;

import com.speech_to_text.domain.port.in.SecurityUseCase;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SecurityService implements SecurityUseCase{

    private final BCryptPasswordEncoder encoder;

    public SecurityService(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Override
    public String crypt(String word) {
        return encoder.encode(word);
    }

    @Override
    public boolean matches(String password, String encodedPassword) {
        return encoder.matches(password, encodedPassword);
    }
} 