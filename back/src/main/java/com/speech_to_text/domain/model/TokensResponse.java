package com.speech_to_text.domain.model;

public class TokensResponse {
    public String accessToken;
    public String refreshToken;
    
    public TokensResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}