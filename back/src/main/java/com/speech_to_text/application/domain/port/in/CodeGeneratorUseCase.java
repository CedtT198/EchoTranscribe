package com.speech_to_text.application.domain.port.in;

public interface CodeGeneratorUseCase {
    int generate();
    boolean hasExpired();
}