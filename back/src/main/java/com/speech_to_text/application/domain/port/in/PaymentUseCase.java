package com.speech_to_text.application.domain.port.in;

import java.util.Map;

public interface PaymentUseCase {
    public Map<String, String> createCheckout(String auth0Id, String email, String plan) throws Exception;
    public void cancelSubscription(String subscriptionId) throws Exception;
    public void cancelSubscriptionAtPeriodEnd(String subscriptionId) throws Exception;
}
