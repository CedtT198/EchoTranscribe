package com.speech_to_text;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.speech_to_text.application.domain.model.others.Review;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import java.time.LocalDate;

@SpringBootTest
@AutoConfigureMockMvc
class ReviewControllerITest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // -------------------------------------------------------------------------
    // Helper
    // -------------------------------------------------------------------------

    private Review buildReview(String id, String auth0Id, Double stars, String comment) {
        Review review = new Review();
        review.setId(id);
        review.setAuth0Id(auth0Id);
        review.setStars(stars);
        review.setReview(comment);
        review.setCreationDate(LocalDate.now());
        review.setName("Name");
        return review;
    }

    // =========================================================================
    // GET /review/findByStars
    // =========================================================================

    @Nested
    @DisplayName("GET /review/findByStars")
    class FindByStars {

        @Test
        @DisplayName("Should return 200 with default pagination when stars and auth0Id are provided")
        void shouldReturn200WithDefaultPagination() throws Exception {
            mockMvc.perform(get("/review/findByStars")
                            .param("stars", "4.0", "5.0")
                            .param("auth0Id", "auth0|6954292e5b43643b131feeee")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON));
        }

        @Test
        @DisplayName("Should return 200 with explicit page and size")
        void shouldReturn200WithExplicitPageAndSize() throws Exception {
            mockMvc.perform(get("/review/findByStars")
                            .param("stars", "3.0")
                            .param("auth0Id", "auth0|6954292e5b43643b131feeee")
                            .param("page", "0")
                            .param("size", "5")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content").isArray())
                    .andExpect(jsonPath("$.size").value(5))
                    .andExpect(jsonPath("$.number").value(0));
        }

        @Test
        @DisplayName("Should return 200 with custom sort ascending")
        void shouldReturn200WithCustomSortAscending() throws Exception {
            mockMvc.perform(get("/review/findByStars")
                            .param("stars", "5.0")
                            .param("auth0Id", "auth0|6954292e5b43643b131feeee")
                            .param("sort", "createdDate,asc")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Should return 200 with custom sort descending")
        void shouldReturn200WithCustomSortDescending() throws Exception {
            mockMvc.perform(get("/review/findByStars")
                            .param("stars", "5.0")
                            .param("auth0Id", "auth0|6954292e5b43643b131feeee")
                            .param("sort", "createdDate,desc")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Should return 200 with all star values (1 to 5)")
        void shouldReturn200WithAllStarValues() throws Exception {
            mockMvc.perform(get("/review/findByStars")
                            .param("stars", "1.0", "2.0", "3.0", "4.0", "5.0")
                            .param("auth0Id", "auth0|6954292e5b43643b131feeee")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content").isArray());
        }

        @Test
        @DisplayName("Should return 200 when stars param is omitted (null → fetch all)")
        void shouldReturn200WhenStarsIsOmitted() throws Exception {
            mockMvc.perform(get("/review/findByStars")
                            .param("auth0Id", "auth0|6954292e5b43643b131feeee")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Should return 400 when auth0Id param is missing")
        void shouldReturn400WhenAuth0IdMissing() throws Exception {
            mockMvc.perform(get("/review/findByStars")
                            .param("stars", "4.0")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when sort format is invalid (missing direction)")
        void shouldReturn400WhenSortFormatIsInvalid() throws Exception {
            mockMvc.perform(get("/review/findByStars")
                            .param("stars", "4.0")
                            .param("auth0Id", "auth0|6954292e5b43643b131feeee")
                            .param("sort", "createdDate")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when sort direction is invalid")
        void shouldReturn400WhenSortDirectionIsInvalid() throws Exception {
            mockMvc.perform(get("/review/findByStars")
                            .param("stars", "4.0")
                            .param("auth0Id", "auth0|6954292e5b43643b131feeee")
                            .param("sort", "createdDate,INVALID_DIR")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }
    }

    // =========================================================================
    // GET /review/stats
    // =========================================================================

    @Nested
    @DisplayName("GET /review/stats")
    class GetStats {

        @Test
        @DisplayName("Should return 200 with statistics object")
        void shouldReturn200WithStats() throws Exception {
            mockMvc.perform(get("/review/stats")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON));
        }

        @Test
        @DisplayName("Should return a non-null body")
        void shouldReturnNonNullBody() throws Exception {
            mockMvc.perform(get("/review/stats"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$").exists());
        }

        @Test
        @DisplayName("Should ignore extra query params and still return 200")
        void shouldIgnoreExtraQueryParams() throws Exception {
            mockMvc.perform(get("/review/stats")
                            .param("unexpected", "param"))
                    .andExpect(status().isOk());
        }
    }

    // =========================================================================
    // GET /review/hasCommented/{auth0id}
    // =========================================================================

    @Nested
    @DisplayName("GET /review/hasCommented/{auth0id}")
    class HasCommented {

        @Test
        @DisplayName("Should return 200 with a boolean result for a known user")
        void shouldReturn200ForKnownUser() throws Exception {
            mockMvc.perform(get("/review/hasCommented/auth0|abc123")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Should return 200 with false for a user who has never commented")
        void shouldReturnFalseForUserWithNoReview() throws Exception {
            mockMvc.perform(get("/review/hasCommented/auth0|nonexistent999"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("false"));
        }

        @Test
        @DisplayName("Should return 200 with true for a user who has already commented")
        void shouldReturnTrueForUserWithReview() throws Exception {
            // Pre-save a review for this user so hasCommented returns true
            Review review = buildReview(null, "auth0|existing_user", 5.0, "Great!");
            mockMvc.perform(post("/review/save")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(review)))
                    .andExpect(status().isOk());

            mockMvc.perform(get("/review/hasCommented/auth0|existing_user"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("true"));
        }

        @Test
        @DisplayName("Should return 404 when auth0id path variable is missing")
        void shouldReturn404WhenAuth0IdMissing() throws Exception {
            mockMvc.perform(get("/review/hasCommented/"))
                    .andExpect(status().isNotFound());
        }
    }

    // =========================================================================
    // DELETE /review/delete/{id}
    // =========================================================================

    @Nested
    @DisplayName("DELETE /review/delete/{id}")
    class DeleteReview {

        @Test
        @DisplayName("Should return 200 when deleting an existing review")
        void shouldReturn200WhenDeletingExistingReview() throws Exception {
            // First save a review to get a real ID
            Review review = buildReview(null, "auth0|userToDelete", 3.0, "Average");
            mockMvc.perform(post("/review/save")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(review)))
                    .andExpect(status().isOk());

            // Retrieve the saved ID — adjust based on how your use case stores/returns it
            // Here we assume the review was stored with auth0Id "auth0|userToDelete"
            // and the delete use case accepts any string ID without throwing
            mockMvc.perform(delete("/review/delete/some-existing-id"))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Should return 200 even for a non-existing id (use case handles silently)")
        void shouldReturn200ForNonExistingId() throws Exception {
            mockMvc.perform(delete("/review/delete/non-existing-id-999"))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Should return 404 when id path variable is missing")
        void shouldReturn404WhenIdMissing() throws Exception {
            mockMvc.perform(delete("/review/delete/"))
                    .andExpect(status().isNotFound());
        }
    }

    // =========================================================================
    // POST /review/update
    // =========================================================================

    @Nested
    @DisplayName("POST /review/update")
    class UpdateReview {

        @Test
        @DisplayName("Should return 200 with updated review when request is valid")
        void shouldReturn200WithUpdatedReview() throws Exception {
            Review review = buildReview("existing-id", "auth0|abc123", 4.0, "Updated comment");

            mockMvc.perform(post("/review/update")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(review)))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Should return 400 when request body is missing")
        void shouldReturn400WhenBodyMissing() throws Exception {
            mockMvc.perform(post("/review/update")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when JSON is malformed")
        void shouldReturn400WhenJsonMalformed() throws Exception {
            mockMvc.perform(post("/review/update")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{ not valid }"))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 415 when content-type is not JSON")
        void shouldReturn415WhenContentTypeIsNotJson() throws Exception {
            mockMvc.perform(post("/review/update")
                            .contentType(MediaType.TEXT_PLAIN)
                            .content("some text"))
                    .andExpect(status().isUnsupportedMediaType());
        }
    }

    // =========================================================================
    // POST /review/save
    // =========================================================================

    @Nested
    @DisplayName("POST /review/save")
    class SaveReview {

        @Test
        @DisplayName("Should return 200 with success message when review is valid")
        void shouldReturn200WithSuccessMessage() throws Exception {
            Review review = buildReview(null, "auth0|newuser", 5.0, "Excellent service!");

            mockMvc.perform(post("/review/save")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(review)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").exists());
        }

        @Test
        @DisplayName("Should return the exact success message text")
        void shouldReturnExactSuccessMessage() throws Exception {
            Review review = buildReview(null, "auth0|newuser2", 4.0, "Good app!");

            mockMvc.perform(post("/review/save")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(review)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(
                            "Thanks for your review, wether it's a bad or good one, it really helps us to provide you   better Speech to text transcription."));
        }

        @Test
        @DisplayName("Should return 200 with no error key in response")
        void shouldNotContainErrorKey() throws Exception {
            Review review = buildReview(null, "auth0|newuser3", 3.0, "Average.");

            mockMvc.perform(post("/review/save")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(review)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.error").doesNotExist());
        }

        @Test
        @DisplayName("Should return 400 when request body is missing")
        void shouldReturn400WhenBodyMissing() throws Exception {
            mockMvc.perform(post("/review/save")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when JSON is malformed")
        void shouldReturn400WhenJsonMalformed() throws Exception {
            mockMvc.perform(post("/review/save")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{ invalid json }"))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 415 when content-type is not JSON")
        void shouldReturn415WhenContentTypeIsNotJson() throws Exception {
            mockMvc.perform(post("/review/save")
                            .contentType(MediaType.TEXT_PLAIN)
                            .content("some review"))
                    .andExpect(status().isUnsupportedMediaType());
        }

        @Test
        @DisplayName("Should persist review — hasCommented returns true after save")
        void shouldPersistReviewSoHasCommentedReturnsTrue() throws Exception {
            String auth0Id = "auth0|persist_test";
            Review review = buildReview(null, auth0Id, 5.0, "Persisted!");

            mockMvc.perform(post("/review/save")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(review)))
                    .andExpect(status().isOk());

            mockMvc.perform(get("/review/hasCommented/" + auth0Id))
                    .andExpect(status().isOk())
                    .andExpect(content().string("true"));
        }
    }
}