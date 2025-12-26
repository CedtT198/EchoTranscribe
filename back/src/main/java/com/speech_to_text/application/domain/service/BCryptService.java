package com.speech_to_text.application.domain.service;

import com.speech_to_text.application.domain.port.in.BCryptUseCase;

import lombok.AllArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BCryptService implements BCryptUseCase{
    private BCryptPasswordEncoder encoder;

    public BCryptService() {
        this.encoder = new BCryptPasswordEncoder();
    }

    @Override
    public String hash(String word) {
        return encoder.encode(word);
    }

    @Override
    public boolean matches(String password, String encodedPassword) {
        return encoder.matches(password, encodedPassword);
    }
} 