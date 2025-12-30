package com.speech_to_text.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "auth0")
public class Auth0Properties {
    String domain;
    String clientId;
    String clientSecret;
    String audience;
}
