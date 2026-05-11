package com.speech_to_text.application.domain.service.withDependance;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.speech_to_text.application.domain.port.in.PaymentUseCase;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.param.SubscriptionUpdateParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PaymentService implements PaymentUseCase {
    
    @Override
    public Map<String, String> createCheckout(String auth0Id, String email, String plan) throws Exception {
        if (auth0Id == null || email == null || plan == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Either auth0Id, email or plan is null. Please fill blank."
            );
        }

        String priceId = "price_1SqB2MPsskg94PLM4IH4S8AW";
        if (plan.toLowerCase().equals("company")) {
            priceId = "price_1SqB2fPsskg94PLMZqAwcHb7";
        }

        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
            .setSuccessUrl("http://localhost:5173/public/layout/profile")
            .setCancelUrl("http://localhost:5173/public/layout/subscription")
            .setClientReferenceId(auth0Id)

            .putMetadata("auth0Id", auth0Id)
            .putMetadata("email", email)
            .putMetadata("plan", plan)
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

    // annulena ny prelevement automatique fa mande foana jusqu'a date de fin de l'abonnement
    @Override
    public void cancelSubscriptionAtPeriodEnd(String subscriptionId) throws Exception {
        Subscription subscription = Subscription.retrieve(subscriptionId);

        SubscriptionUpdateParams params = SubscriptionUpdateParams.builder()
                .setCancelAtPeriodEnd(true)
                .build();

        subscription.update(params);
    }
}
