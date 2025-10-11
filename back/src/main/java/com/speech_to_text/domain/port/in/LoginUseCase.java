package com.speech_to_text.domain.port.in;

public interface LoginUseCase {
    boolean checkLogin(String mail, String password);
}
