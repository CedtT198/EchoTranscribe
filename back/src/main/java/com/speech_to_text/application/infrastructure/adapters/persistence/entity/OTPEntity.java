package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "otp")
public class OTPEntity {
    @Id
    private String id;

    private String email;
    private String code;

    @Indexed(expireAfterSeconds = 0)
    private Instant expireAt;
}
