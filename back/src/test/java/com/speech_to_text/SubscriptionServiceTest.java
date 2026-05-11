package com.speech_to_text;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import com.speech_to_text.application.domain.model.subscription.Subscription;
import com.speech_to_text.application.domain.port.out.SubscriptionRepository;
import com.speech_to_text.application.domain.service.withDependance.SubscriptionService;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SubscriptionServiceTest {

    @Mock
    private SubscriptionRepository subRepo;

    @InjectMocks
    private SubscriptionService subscriptionService;

    private static final String AUTH0_ID = "auth0|123";
    private static final String EMAIL    = "user@test.com";
    private static final String CODE     = "INVITE-XYZ";
    private static final String OWNER    = "auth0|owner";

    @BeforeEach
    void setUp() {
        // Inject the @Value field maxSharingSub (usually injected by Spring)
        ReflectionTestUtils.setField(subscriptionService, "maxSharingSub", 5);
    }

    // =========================================================================
    // useInvitationCode
    // =========================================================================

    @Nested
    class UseInvitationCode {

        private Subscription mainSub;

        @BeforeEach
        void init() {
            mainSub = new Subscription();
            mainSub.setInvitationCode(CODE);
            mainSub.setSubscriptionOwner(OWNER);
            mainSub.setSubscriptionType("PRO");
            mainSub.setStatus("ACTIVE");
        }

        @Test
        void shouldSaveNewSubscription() throws Exception {
            when(subRepo.findByCode(CODE)).thenReturn(mainSub);
            when(subRepo.findByOwner(OWNER)).thenReturn(List.of(mainSub)); // 1 < 5
            Subscription saved = new Subscription();
            when(subRepo.save(any())).thenReturn(saved);

            Subscription result = subscriptionService.useInvicationCode(AUTH0_ID, EMAIL, CODE);

            assertNotNull(result);
            verify(subRepo).save(argThat(sub ->
                sub.getAuth0Id().equals(AUTH0_ID) &&
                sub.getMail().equals(EMAIL) &&
                sub.getSubscriptionType().equals("PRO") &&
                sub.getStatus().equals("ACTIVE") &&
                sub.getCredit() == 0 &&
                sub.getCreditPerCycle() == 100 &&
                sub.getPurchaseDate().equals(LocalDate.now()) &&
                sub.getSubscriptionOwner().equals(OWNER)
            ));
        }

        @Test
        void shouldThrowExeptionIfCodeDoesntExist() {
            when(subRepo.findByCode(CODE)).thenReturn(null);

            Exception ex = assertThrows(Exception.class,
                () -> subscriptionService.useInvicationCode(AUTH0_ID, EMAIL, CODE));

            assertEquals("Code doesn't exist.", ex.getMessage());
            verifyNoMoreInteractions(subRepo);
        }

        @Test
        void shouldThrowExeptionIfMaxSharingReached() {
            when(subRepo.findByCode(CODE)).thenReturn(mainSub);
            // 5 subs already = equals maxSharingSub (5)
            List<Subscription> fullList = Collections.nCopies(5, new Subscription());
            when(subRepo.findByOwner(OWNER)).thenReturn(fullList);

            Exception ex = assertThrows(Exception.class,
                    () -> subscriptionService.useInvicationCode(AUTH0_ID, EMAIL, CODE));

            assertEquals("This subscription has reached its maximum number of users. Use another code.", ex.getMessage());
            verify(subRepo, never()).save(any());
        }

        @Test
        void shouldSuccessIfSubNumberUnderMaxSharingLimit() throws Exception {
            when(subRepo.findByCode(CODE)).thenReturn(mainSub);
            when(subRepo.findByOwner(OWNER)).thenReturn(Collections.nCopies(4, new Subscription())); // 4 < 5
            when(subRepo.save(any())).thenReturn(new Subscription());

            assertDoesNotThrow(() -> subscriptionService.useInvicationCode(AUTH0_ID, EMAIL, CODE));
        }
    }

    // =========================================================================
    // findActualSub
    // =========================================================================

    @Nested
    class FindActualSub {

        @Test
        void shouldReturnFreePlanIfNoSubscription() {
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(Collections.emptyList());

            Subscription result = subscriptionService.findActualSub(AUTH0_ID);

            assertEquals("Free plan", result.getSubscriptionType());
            assertEquals(AUTH0_ID, result.getSubscriptionOwner());
        }

        @Test
        void shouldReturnFreePlanIfFreePlan() {
            Subscription freeSub = buildSub("Free plan", "ACTIVE");
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(List.of(freeSub));

            Subscription result = subscriptionService.findActualSub(AUTH0_ID);

            assertEquals("Free plan", result.getSubscriptionType());
        }

        @Test
        void shouldReturnFreePlanIfStatusCanceled() {
            Subscription canceledSub = buildSub("Pro", "CANCELED");
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(List.of(canceledSub));

            Subscription result = subscriptionService.findActualSub(AUTH0_ID);

            assertEquals("Free plan", result.getSubscriptionType());
        }

        @Test
        void shouldReturnActualSubIfStatusActive() {
            Subscription activeSub = buildSub("Pro", "ACTIVE");
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(List.of(activeSub));

            Subscription result = subscriptionService.findActualSub(AUTH0_ID);
            assertSame(activeSub, result);
        }

        @Test
        void shouldReturnActualSubIfStatusCancelAtPeriodEnd() {
            Subscription sub = buildSub("Pro", "CANCEL_AT_PERIOD_END");
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(List.of(sub));

            Subscription result = subscriptionService.findActualSub(AUTH0_ID);
            assertSame(sub, result);
        }

        @Test
        void shouldReturnActualSubIfStatusUnknown() {
            Subscription sub = buildSub("Pro", "PENDING");
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(List.of(sub));

            Subscription result = subscriptionService.findActualSub(AUTH0_ID);

            assertEquals("Free plan", result.getSubscriptionType());
        }
    }

    // =========================================================================
    // addCredit
    // =========================================================================

    @Nested
    class AddCredit {

        @Test
        void shouldIncrementeCreditAndUpdateDate() {
            Subscription sub = buildSub("Pro", "ACTIVE");
            sub.setCredit(200);
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(List.of(sub));

            subscriptionService.addCredit(AUTH0_ID, 300);

            assertEquals(500, sub.getCredit());
            assertEquals(LocalDate.now(), sub.getLastCreditRenewalDate());
            verify(subRepo).save(sub);
        }

        @Test
        void shouldIncrementeCreditFromZeroOnFreePlan() {
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(Collections.emptyList());

            subscriptionService.addCredit(AUTH0_ID, 50);

            // Free plan credit starts at 10 (see constructor), 10 + 50 = 60
            verify(subRepo).save(argThat(s -> s.getCredit() == 60));
        }
    }

    // =========================================================================
    // consumeCredit
    // =========================================================================

    @Nested
    class ConsumeCredit {

        @Test
        void shouldDicreaseCreditAndReturnTrue() throws Exception {
            Subscription sub = buildSub("Pro", "ACTIVE");
            sub.setCredit(500);
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(List.of(sub));

            boolean result = subscriptionService.consumeCredit(AUTH0_ID, 100);

            assertTrue(result);
            assertEquals(400, sub.getCredit());
            verify(subRepo).save(sub);
        }

        @Test
        void shouldThrowExeptionIfNotEnoughCredit() {
            Subscription sub = buildSub("Pro", "ACTIVE");
            sub.setCredit(50);
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(List.of(sub));

            Exception ex = assertThrows(Exception.class,
                    () -> subscriptionService.consumeCredit(AUTH0_ID, 100));

            assertEquals("Not enough credit", ex.getMessage());
            verify(subRepo, never()).save(any());
        }

        @Test
        void shouldSuccessIfCreditEqualsAmount() throws Exception {
            Subscription sub = buildSub("Pro", "ACTIVE");
            sub.setCredit(100);
            when(subRepo.findAllByAuth0Id(AUTH0_ID)).thenReturn(List.of(sub));

            boolean result = subscriptionService.consumeCredit(AUTH0_ID, 100);

            assertTrue(result);
            assertEquals(0, sub.getCredit());
        }
    }

    // =========================================================================
    // getCreditByPlan
    // =========================================================================

    @Nested
    class GetCreditByPlan {

        @ParameterizedTest(name = "{0} → {1} crédits")
        @CsvSource({
            "free plan, 100",
            "Free Plan, 100",   // insensible à la casse
            "FREE PLAN, 100",
            "pro,       500",
            "Pro,       500",
            "company,   2000",
            "Company,   2000",
        })
        void shuoldReturnCreditDependingOnPlan(String plan, int expectedCredit) {
            assertEquals(expectedCredit, subscriptionService.getCreditByPlan(plan));
        }

        @Test
        void shouldReturnZeroForUnknownPlan() {
            assertEquals(0, subscriptionService.getCreditByPlan("enterprise"));
        }
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    private Subscription buildSub(String type, String status) {
        Subscription sub = new Subscription();
        sub.setAuth0Id(AUTH0_ID);
        sub.setSubscriptionType(type);
        sub.setStatus(status);
        sub.setCredit(0);
        return sub;
    }
}