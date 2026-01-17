package com.speech_to_text.application.domain.service.withDependance;

import java.util.Map;
import org.springframework.stereotype.Service;
import com.speech_to_text.application.domain.port.in.PaymentUseCase;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PaymentService implements PaymentUseCase {
    
    @Override
    public Map<String, String> createCheckout(String plan) throws Exception {
        String priceId = "price_1SqB2MPsskg94PLM4IH4S8AW";
        if (plan.toLowerCase().equals("company")) {
            priceId = "price_1SqB2fPsskg94PLMZqAwcHb7";
        }

        SessionCreateParams params =
        SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
            // .setSuccessUrl("http://localhost:5173/public/layout/payment/success")
            .setSuccessUrl("http://localhost:5173/public/layout/profile")
            .setCancelUrl("http://localhost:5173/public/layout/payment/cancel")
            .addLineItem(
                SessionCreateParams.LineItem.builder()
                    .setPrice(priceId)
                    .setQuantity(1L)
                    .build()
            )
            .build();

        Session session = Session.create(params);
        return Map.of("url", session.getUrl());
    }

    @Override
    public void cancelSubscription(String subscriptionId) throws Exception {
        Subscription subscription = Subscription.retrieve(subscriptionId);
        subscription.cancel();
    }
}
