package com.speech_to_text.application.domain.port.out;

import java.util.List;
import com.speech_to_text.application.domain.model.SubscriptionType;

public interface SubscriptionTypeRepository {
    public List<SubscriptionType> findAll();
}
