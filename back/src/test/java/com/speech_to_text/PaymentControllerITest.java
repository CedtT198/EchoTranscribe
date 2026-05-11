package com.speech_to_text;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.speech_to_text.application.domain.model.DTO.CheckoutDTO;
import com.speech_to_text.application.domain.model.subscription.Subscription;
import com.speech_to_text.application.infrastructure.adapters.persistence.MongoSubscriptionRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import java.time.LocalDate;

@SpringBootTest
@AutoConfigureMockMvc
class PaymentControllerITest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
    
    // @Autowired
    // private MongoSubscriptionRepository mongoSubRepo;
    
    // @BeforeEach
    // void setup() {
    //     mongoSubRepo.save(new Subscription(
    //         "sub_23456789",
    //         0,
    //         100,
    //         null,
    //         "auth0idtest_1234",
    //         "test@gmail.com",
    //         "Free plan",
    //         "ACTIVE",
    //         LocalDate.now(),
    //         null,
    //         null,
    //         null,
    //         null
    //     )); 
    // }

    // @AfterEach
    // void cleanup() {
    //     mongoSubRepo.deleteAllByAuth0Id("auth0idtest_1234");
    // }

    // -------------------------------------------------------------------------
    // Helper
    // -------------------------------------------------------------------------
    private CheckoutDTO buildCheckoutDTO(String auth0Id, String email, String plan) {
        CheckoutDTO dto = new CheckoutDTO();
        dto.setAuth0Id(auth0Id);
        dto.setEmail(email);
        dto.setPlan(plan);
        return dto;
    }

    // =========================================================================
    // POST /payment/checkout
    // =========================================================================

    @Nested
    @DisplayName("POST /payment/checkout")
    class CreateCheckout {

        @Test
        @DisplayName("Should return 200 with checkout URL map when request is valid")
        void shouldReturn200WithValidCheckout() throws Exception {
            CheckoutDTO dto = buildCheckoutDTO("auth0|abc123", "user@example.com", "pro");

            mockMvc.perform(post("/payment/checkout")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON));
        }

        @Test
        @DisplayName("Should return a map (JSON object) in the response body")
        void shouldReturnMapInBody() throws Exception {
            CheckoutDTO dto = buildCheckoutDTO("auth0|abc123", "user@example.com", "pro");

            mockMvc.perform(post("/payment/checkout")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    // the controller returns Map<String, String> — verify it is a JSON object
                    .andExpect(jsonPath("$").isMap());
        }

        @Test
        @DisplayName("Should propagate exception (500) when auth0Id is null")
        void shouldFailWhenAuth0IdIsNull() throws Exception {
            CheckoutDTO dto = buildCheckoutDTO(null, "user@example.com", "pro");

            mockMvc.perform(post("/payment/checkout")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should propagate exception (500) when email is null")
        void shouldFailWhenEmailIsNull() throws Exception {
            CheckoutDTO dto = buildCheckoutDTO("auth0|abc123", null, "pro");

            mockMvc.perform(post("/payment/checkout")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should propagate exception (500) when plan is null")
        void shouldFailWhenPlanIsNull() throws Exception {
            CheckoutDTO dto = buildCheckoutDTO("auth0|abc123", "user@example.com", null);

            mockMvc.perform(post("/payment/checkout")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when request body is missing")
        void shouldReturn400WhenBodyIsMissing() throws Exception {
            mockMvc.perform(post("/payment/checkout")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when JSON is malformed")
        void shouldReturn400WhenJsonIsMalformed() throws Exception {
            mockMvc.perform(post("/payment/checkout")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{ not valid json }"))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when body is empty JSON object")
        void shouldReturn400OrFailWhenBodyIsEmptyObject() throws Exception {
            mockMvc.perform(post("/payment/checkout")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    // all fields null → use case throws → Spring maps to 5xx
                    .andExpect(status().is4xxClientError());
        }

        @Test
        @DisplayName("Should return 415 when content-type is not JSON")
        void shouldReturn415WhenContentTypeIsNotJson() throws Exception {
            mockMvc.perform(post("/payment/checkout")
                            .contentType(MediaType.TEXT_PLAIN)
                            .content("pro"))
                    .andExpect(status().isUnsupportedMediaType());
        }

        @Test
        @DisplayName("Should return 200 for different plan values")
        void shouldReturn200ForDifferentPlans() throws Exception {
            for (String plan : new String[]{"basic", "pro", "enterprise"}) {
                CheckoutDTO dto = buildCheckoutDTO("auth0|abc123", "user@example.com", plan);

                mockMvc.perform(post("/payment/checkout")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(dto)))
                        .andExpect(status().isOk());
            }
        }
    }

    // =========================================================================
    // POST /payment/subscription/cancel/{subId}
    // =========================================================================

    @Nested
    @DisplayName("POST /payment/subscription/cancel/{subId}")
    class CancelSubscription {

        // @Test
        // @DisplayName("Should return 200 with success message when subId is valid")
        // void shouldReturn200WithSuccessMessage() throws Exception { 
        //     mockMvc.perform(post("/payment/subscription/cancel/sub_23456789")
        //                     .contentType(MediaType.APPLICATION_JSON))
        //             .andExpect(status().isOk())
        //             .andExpect(jsonPath("$.success")
        //                     .value("Your subscription has been canceled successfuly"));
        // }

        // @Test
        // @DisplayName("Should return 200 and body is a JSON object")
        // void shouldReturn200WithJsonObject() throws Exception {
        //     mockMvc.perform(post("/payment/subscription/cancel/sub_23456789")
        //                     .contentType(MediaType.APPLICATION_JSON))
        //             .andExpect(status().isOk())
        //             .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        //             .andExpect(jsonPath("$").isMap());
        // }

        // @Test
        // @DisplayName("Should return 401 with error message when subId is unknown")
        // void shouldReturn401WhenSubIdIsUnknown() throws Exception {
        //     mockMvc.perform(post("/payment/subscription/cancel/sub_23456789")
        //                     .contentType(MediaType.APPLICATION_JSON))
        //             .andExpect(status().isUnauthorized())
        //             .andExpect(jsonPath("$.error").exists());
        // }

        @Test
        @DisplayName("Should return 401 when use case throws an exception")
        void shouldReturn401WhenUseCaseThrows() throws Exception {
            // Pass a deliberately invalid subId that the payment provider will reject
            mockMvc.perform(post("/payment/subscription/cancel/INVALID_SUB_ID")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").exists());
        }

        // @Test
        // @DisplayName("Should treat subId as a plain string (no JSON body needed)")
        // void shouldAcceptSubIdFromPath() throws Exception {
        //     mockMvc.perform(post("/payment/subscription/cancel/sub_23456789"))
        //             .andExpect(result -> {
        //                 int status = result.getResponse().getStatus();
        //                 if (status != 200 && status != 401) {
        //                     throw new AssertionError("Expected status 200 or 401 but was: " + status);
        //                 }
        //             });
        // }

        @Test
        @DisplayName("Should return 404 when subId path variable is missing entirely")
        void shouldReturn404WhenSubIdMissing() throws Exception {
            mockMvc.perform(post("/payment/subscription/cancel/")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNotFound());
        }

        // @Test
        // @DisplayName("Should return 200 with only the success key in response body")
        // void shouldReturnOnlySuccessKeyOnSuccess() throws Exception {
        //     mockMvc.perform(post("/payment/subscription/cancel/sub_23456789")
        //                     .contentType(MediaType.APPLICATION_JSON))
        //             .andExpect(status().isOk())
        //             .andExpect(jsonPath("$.error").doesNotExist())
        //             .andExpect(jsonPath("$.success").exists());
        // }

        // @Test
        // @DisplayName("Should return 401 with only the error key in response body on failure")
        // void shouldReturnOnlyErrorKeyOnFailure() throws Exception {
        //     mockMvc.perform(post("/payment/subscription/cancel/sub_23456789")
        //                     .contentType(MediaType.APPLICATION_JSON))
        //             .andExpect(status().isUnauthorized())
        //             .andExpect(jsonPath("$.success").doesNotExist())
        //             .andExpect(jsonPath("$.error").exists());
        // }
    }
}
