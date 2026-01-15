package com.speech_to_text.application.domain.port.in;

import java.util.List;

import com.speech_to_text.application.domain.model.subscription.SubscriptionType;

public interface SubscriptionTypeUseCase {
    public List<SubscriptionType> findAll();
}
