package com.speech_to_text;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import com.speech_to_text.application.domain.service.withDependance.PaymentService;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.param.SubscriptionUpdateParams;
import com.stripe.param.checkout.SessionCreateParams;

class PaymentServiceTest {

    private PaymentService paymentService;

    @BeforeEach
    void setUp() {
        paymentService = new PaymentService();
    }

    @Test
    void shouldCreateCheckoutForBasicPlan() throws Exception {

        Session session = mock(Session.class);

        when(session.getUrl()).thenReturn("https://stripe-session-url");

        try (MockedStatic<Session> mockedSession =mockStatic(Session.class)) {

            mockedSession.when(() ->Session.create(any(SessionCreateParams.class))).thenReturn(session);

            Map<String, String> result = paymentService.createCheckout(
                    "auth0|123",
                    "test@mail.com",
                    "basic"
            );

            assertNotNull(result);
            assertEquals(
                    "https://stripe-session-url",
                    result.get("url")
            );

            mockedSession.verify(() -> Session.create(any(SessionCreateParams.class)), times(1));
        }
    }

    @Test
    void shouldCreateCheckoutForCompanyPlan() throws Exception {

        Session session = mock(Session.class);

        when(session.getUrl()).thenReturn("https://company-session");

        try (MockedStatic<Session> mockedSession = mockStatic(Session.class)) {

            mockedSession.when(() -> Session.create(any(SessionCreateParams.class))).thenReturn(session);

            Map<String, String> result = paymentService.createCheckout(
                    "auth0|456",
                    "company@mail.com",
                    "company"
            );

            assertEquals(
                    "https://company-session",
                    result.get("url")
            );
        }
    }

    @Test
    void shouldCancelSubscription() throws Exception {

        Subscription subscription = mock(Subscription.class);

        try (MockedStatic<Subscription> mockedSubscription = mockStatic(Subscription.class)) {

            mockedSubscription.when(() -> Subscription.retrieve("sub_123")).thenReturn(subscription);
            paymentService.cancelSubscription("sub_123");

            verify(subscription, times(1)).cancel();
        }
    }

    @Test
    void shouldCancelSubscriptionAtPeriodEnd() throws Exception {

        Subscription subscription = mock(Subscription.class);

        try (MockedStatic<Subscription> mockedSubscription = mockStatic(Subscription.class)) {
            mockedSubscription.when(() -> Subscription.retrieve("sub_456")).thenReturn(subscription);

            paymentService.cancelSubscriptionAtPeriodEnd("sub_456");
            verify(subscription, times(1)).update(any(SubscriptionUpdateParams.class));
        }
    }

    @Test
    void shouldThrowExceptionWhenStripeFailsDuringCheckout() {

        try (MockedStatic<Session> mockedSession =mockStatic(Session.class)) {
            mockedSession.when(() -> Session.create(any(SessionCreateParams.class))).thenThrow(new RuntimeException("Stripe error"));

            assertThrows(Exception.class, () ->
                    paymentService.createCheckout(
                            "auth0",
                            "mail@test.com",
                            "basic"
                    )
            );
        }
    }
}