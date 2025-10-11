package com.speech_to_text.domain.port;

public interface SecurityUseCase {
    String crypt(String text);
    String decrypt(String text);
}
