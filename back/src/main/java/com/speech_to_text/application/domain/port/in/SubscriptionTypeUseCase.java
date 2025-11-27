package com.speech_to_text.application.domain.port.in;

import java.util.List;
import com.speech_to_text.application.domain.model.Subscription;

public interface SubscriptionTypeUseCase {
    public List<Subscription> findAll();
}
