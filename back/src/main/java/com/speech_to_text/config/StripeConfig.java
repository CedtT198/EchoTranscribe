package com.speech_to_text.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;

@Configuration
public class StripeConfig {
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        System.out.println(stripeSecretKey);
        Stripe.apiKey = stripeSecretKey;
    }
}
