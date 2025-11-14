package com.speech_to_text.application.domain.service;

import com.speech_to_text.application.domain.port.in.SecurityUseCase;

import lombok.AllArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SecurityService implements SecurityUseCase{
    private BCryptPasswordEncoder encoder;

    public SecurityService() {
        this.encoder = new BCryptPasswordEncoder();
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