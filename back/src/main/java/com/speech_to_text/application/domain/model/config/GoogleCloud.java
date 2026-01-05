package com.speech_to_text.application.domain.model.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "gcloud")
public class GoogleCloud {
    String bucketName;
    String location;
    String projectId;
    String modelSpeechToText;
    // String audience;
}
