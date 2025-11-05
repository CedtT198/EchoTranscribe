package com.speech_to_text.application.domain.port.in;

public interface OTPUseCase {
    String getCode(String email);
    void generate(String email);
    boolean verify(String email, String code);
}