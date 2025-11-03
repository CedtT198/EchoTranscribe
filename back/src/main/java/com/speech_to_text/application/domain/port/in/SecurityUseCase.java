package com.speech_to_text.application.domain.port.in;

public interface SecurityUseCase {
    String crypt(String word);
    boolean matches(String word1, String word2);
}
