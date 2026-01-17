package com.speech_to_text.application.domain.port.in;

import java.util.Map;

public interface PaymentUseCase {
    public Map<String, String> createCheckout(String plan) throws Exception;
    public void cancelSubscription(String subscriptionId) throws Exception;
}
