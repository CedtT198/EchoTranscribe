package com.speech_to_text.application.domain.port.out;

import com.speech_to_text.application.infrastructure.adapters.persistence.entity.OTPEntity;

public  interface OTPRepository {
    OTPEntity get(String key);
    int save(OTPEntity otp);
}
