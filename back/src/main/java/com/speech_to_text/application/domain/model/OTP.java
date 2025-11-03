package com.speech_to_text.application.domain.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OTP {
    private String id;
    private String email;
    private String code;
    private Instant expireAt;
}
