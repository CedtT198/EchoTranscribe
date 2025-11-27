package com.speech_to_text.application.domain.service;

import java.util.List;

import com.speech_to_text.application.domain.model.Subscription;
import com.speech_to_text.application.domain.port.in.SubscriptionTypeUseCase;

public class SubscriptionTypeService implements SubscriptionTypeUseCase{

    @Override
    public List<Subscription> findAll() {
        return null;
    }
    
}
