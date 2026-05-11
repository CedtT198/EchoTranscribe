package com.speech_to_text;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.speech_to_text.application.domain.model.DTO.InvitationCodeDTO;
import com.speech_to_text.application.domain.model.DTO.SubscriptionFilterDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SubscriptionControllerITest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private InvitationCodeDTO invitationCodeDTO;
    private SubscriptionFilterDto filterDto;

    @BeforeEach
    void setUp() {
        invitationCodeDTO = new InvitationCodeDTO();
        invitationCodeDTO.setAuth0id("auth0|test123");
        invitationCodeDTO.setMail("test@example.com");
        invitationCodeDTO.setCode("INVITE-XYZ123");

        filterDto = new SubscriptionFilterDto();
        // Remplis selon les champs de ton DTO
        filterDto.setStatus("ACTIVE"); // exemple
    }

    // ===================================================================
    // 1. POST /subscription/findByFilters
    // ===================================================================
    // @Test
    // @DisplayName("Devrait retourner une page de subscriptions avec filtres")
    // void shouldReturnPaginatedSubscriptions() throws Exception {
    //     String requestBody = objectMapper.writeValueAsString(filterDto);

    //     mockMvc.perform(post("/subscription/findByFilters")
    //                     .param("page", "0")
    //                     .param("size", "10")
    //                     .param("sort", "purchaseDate,desc")
    //                     .contentType(MediaType.APPLICATION_JSON)
    //                     .content(requestBody))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.content").isArray())
    //             .andExpect(jsonPath("$.totalElements").isNumber());
    // }

    // ===================================================================
    // 2. GET /subscription/findAllByAuth0Id/{auth0id}
    // ===================================================================
    @Test
    @DisplayName("Devrait retourner toutes les subscriptions d'un utilisateur Auth0")
    void shouldReturnUserSubscriptions() throws Exception {
        String auth0id = "auth0|test123";

        mockMvc.perform(get("/subscription/findAllByAuth0Id/{auth0id}", auth0id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    // ===================================================================
    // 3. POST /subscription/invitationcode
    // ===================================================================
    // @Test
    // @DisplayName("Devrait utiliser un code d'invitation avec succès")
    // void useInvitationCodeShouldSucceed() throws Exception {
    //     String requestBody = objectMapper.writeValueAsString(invitationCodeDTO);

    //     mockMvc.perform(post("/subscription/invitationcode")
    //                     .contentType(MediaType.APPLICATION_JSON)
    //                     .content(requestBody))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.success").exists())
    //             .andExpect(jsonPath("$.success").value("You subscribed successfuly to plan."));
    // }

    @Test
    @DisplayName("Devrait retourner une erreur si le code d'invitation est invalide")
    void useInvitationCodeShouldReturnError_WhenInvalid() throws Exception {
        InvitationCodeDTO invalid = new InvitationCodeDTO();
        invalid.setAuth0id("auth0|test123");
        invalid.setMail("test@example.com");
        invalid.setCode("INVALID-CODE");

        String requestBody = objectMapper.writeValueAsString(invalid);

        mockMvc.perform(post("/subscription/invitationcode")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").exists());
    }

    // ===================================================================
    // 4. POST /subscription/findActual/{auth0id}
    // ===================================================================
    @Test
    @DisplayName("Devrait retourner l'abonnement actuel d'un utilisateur")
    void findActualSubShouldReturnCurrentSubscription() throws Exception {
        String auth0id = "auth0|test123";

        mockMvc.perform(post("/subscription/findActual/{auth0id}", auth0id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").exists());
    }

    // ===================================================================
    // 5. GET /subscription/type/findAll
    // ===================================================================
    @Test
    @DisplayName("Devrait retourner tous les types d'abonnements")
    void findAllSubscriptionTypesShouldReturnList() throws Exception {
        mockMvc.perform(get("/subscription/type/findAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}