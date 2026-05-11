package com.speech_to_text;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class DashboardControllerITest {
    
    @Autowired
    private MockMvc mockMvc;
 
    // =========================================================================
    // GET /dashboard/getGeneralStat
    // =========================================================================
 
    @Nested
    @DisplayName("GET /dashboard/getGeneralStat")
    class GetGeneralStat {
 
        @Test
        @DisplayName("Should return 200 with valid startDate and endDate")
        void shouldReturn200WithValidDates() throws Exception {
            mockMvc.perform(get("/dashboard/getGeneralStat")
                            .param("startDate", "2024-01-01")
                            .param("endDate", "2024-12-31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }
 
        @Test
        @DisplayName("Should return 200 when startDate equals endDate")
        void shouldReturn200WhenStartDateEqualsEndDate() throws Exception {
            mockMvc.perform(get("/dashboard/getGeneralStat")
                            .param("startDate", "2024-06-15")
                            .param("endDate", "2024-06-15")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }
 
        @Test
        @DisplayName("Should return 401 when startDate is missing")
        void shouldReturn401WhenStartDateMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getGeneralStat")
                            .param("endDate", "2024-12-31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when endDate is missing")
        void shouldReturn401WhenEndDateMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getGeneralStat")
                            .param("startDate", "2024-01-01")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when both dates are missing")
        void shouldReturn401WhenBothDatesMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getGeneralStat")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when startDate is after endDate")
        void shouldReturn401WhenStartDateAfterEndDate() throws Exception {
            mockMvc.perform(get("/dashboard/getGeneralStat")
                            .param("startDate", "2024-12-31")
                            .param("endDate", "2024-01-01")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date cannot be after End date."));
        }
 
        @Test
        @DisplayName("Should return 400 when date format is invalid")
        void shouldReturn400WhenDateFormatInvalid() throws Exception {
            mockMvc.perform(get("/dashboard/getGeneralStat")
                            .param("startDate", "not-a-date")
                            .param("endDate", "2024-12-31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }
    }
 
    // =========================================================================
    // GET /dashboard/getUsersStat
    // =========================================================================
 
    @Nested
    @DisplayName("GET /dashboard/getUsersStat")
    class GetUsersStat {
 
        @Test
        @DisplayName("Should return 200 with valid startDate and endDate")
        void shouldReturn200WithValidDates() throws Exception {
            mockMvc.perform(get("/dashboard/getUsersStat")
                            .param("startDate", "2024-01-01")
                            .param("endDate", "2024-12-31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }
 
        @Test
        @DisplayName("Should return 200 when startDate equals endDate")
        void shouldReturn200WhenStartDateEqualsEndDate() throws Exception {
            mockMvc.perform(get("/dashboard/getUsersStat")
                            .param("startDate", "2024-06-15")
                            .param("endDate", "2024-06-15")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }
 
        @Test
        @DisplayName("Should return 401 when startDate is missing")
        void shouldReturn401WhenStartDateMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getUsersStat")
                            .param("endDate", "2024-12-31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when endDate is missing")
        void shouldReturn401WhenEndDateMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getUsersStat")
                            .param("startDate", "2024-01-01")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when both dates are missing")
        void shouldReturn401WhenBothDatesMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getUsersStat")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when startDate is after endDate")
        void shouldReturn401WhenStartDateAfterEndDate() throws Exception {
            mockMvc.perform(get("/dashboard/getUsersStat")
                            .param("startDate", "2024-12-31")
                            .param("endDate", "2024-01-01")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date cannot be after End date."));
        }
 
        @Test
        @DisplayName("Should return 400 when date format is invalid")
        void shouldReturn400WhenDateFormatInvalid() throws Exception {
            mockMvc.perform(get("/dashboard/getUsersStat")
                            .param("startDate", "2024-01-01")
                            .param("endDate", "invalid-date")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }
    }
 
    // =========================================================================
    // GET /dashboard/getSalesStat
    // =========================================================================
 
    @Nested
    @DisplayName("GET /dashboard/getSalesStat")
    class GetSalesStat {
 
        @Test
        @DisplayName("Should return 200 with valid startDate and endDate")
        void shouldReturn200WithValidDates() throws Exception {
            mockMvc.perform(get("/dashboard/getSalesStat")
                            .param("startDate", "2024-01-01")
                            .param("endDate", "2024-12-31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }
 
        @Test
        @DisplayName("Should return 200 when startDate equals endDate")
        void shouldReturn200WhenStartDateEqualsEndDate() throws Exception {
            mockMvc.perform(get("/dashboard/getSalesStat")
                            .param("startDate", "2024-03-10")
                            .param("endDate", "2024-03-10")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }
 
        @Test
        @DisplayName("Should return 401 when startDate is missing")
        void shouldReturn401WhenStartDateMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getSalesStat")
                            .param("endDate", "2024-12-31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when endDate is missing")
        void shouldReturn401WhenEndDateMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getSalesStat")
                            .param("startDate", "2024-01-01")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when both dates are missing")
        void shouldReturn401WhenBothDatesMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getSalesStat")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when startDate is after endDate")
        void shouldReturn401WhenStartDateAfterEndDate() throws Exception {
            mockMvc.perform(get("/dashboard/getSalesStat")
                            .param("startDate", "2024-12-31")
                            .param("endDate", "2024-01-01")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date cannot be after End date."));
        }
 
        @Test
        @DisplayName("Should return 400 when date format is invalid")
        void shouldReturn400WhenDateFormatInvalid() throws Exception {
            mockMvc.perform(get("/dashboard/getSalesStat")
                            .param("startDate", "01-01-2024")
                            .param("endDate", "31-12-2024")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }
    }
 
    // =========================================================================
    // GET /dashboard/getPerformanceStat
    // =========================================================================
 
    @Nested
    @DisplayName("GET /dashboard/getPerformanceStat")
    class GetPerformanceStat {
 
        @Test
        @DisplayName("Should return 200 with valid startDate and endDate")
        void shouldReturn200WithValidDates() throws Exception {
            mockMvc.perform(get("/dashboard/getPerformanceStat")
                            .param("startDate", "2024-01-01")
                            .param("endDate", "2024-12-31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }
 
        @Test
        @DisplayName("Should return 200 when startDate equals endDate")
        void shouldReturn200WhenStartDateEqualsEndDate() throws Exception {
            mockMvc.perform(get("/dashboard/getPerformanceStat")
                            .param("startDate", "2024-09-01")
                            .param("endDate", "2024-09-01")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }
 
        @Test
        @DisplayName("Should return 401 when startDate is missing")
        void shouldReturn401WhenStartDateMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getPerformanceStat")
                            .param("endDate", "2024-12-31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when endDate is missing")
        void shouldReturn401WhenEndDateMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getPerformanceStat")
                            .param("startDate", "2024-01-01")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when both dates are missing")
        void shouldReturn401WhenBothDatesMissing() throws Exception {
            mockMvc.perform(get("/dashboard/getPerformanceStat")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date and End date must be set."));
        }
 
        @Test
        @DisplayName("Should return 401 when startDate is after endDate")
        void shouldReturn401WhenStartDateAfterEndDate() throws Exception {
            mockMvc.perform(get("/dashboard/getPerformanceStat")
                            .param("startDate", "2024-12-31")
                            .param("endDate", "2024-01-01")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error").value("Start date cannot be after End date."));
        }
 
        @Test
        @DisplayName("Should return 400 when date format is invalid")
        void shouldReturn400WhenDateFormatInvalid() throws Exception {
            mockMvc.perform(get("/dashboard/getPerformanceStat")
                            .param("startDate", "2024/01/01")
                            .param("endDate", "2024/12/31")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }
    }

}