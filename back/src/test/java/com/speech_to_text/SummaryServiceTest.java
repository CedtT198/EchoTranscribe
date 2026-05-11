package com.speech_to_text;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.reactive.function.client.WebClient;
import com.speech_to_text.application.domain.port.in.SubscriptionUseCase;
import com.speech_to_text.application.domain.service.withDependance.SummaryService;

class SummarizationServiceTest {

    private WebClient webClient;
    private SubscriptionUseCase subUseCase;
    private SummaryService summaryService;

    @BeforeEach
    void setUp() {
        webClient = mock(WebClient.class);
        subUseCase = mock(SubscriptionUseCase.class);

        summaryService = new SummaryService(webClient, subUseCase);
    }

    @Test
    void shouldBuildPromptSuccessfully() {
        String result = summaryService.buildPrompt(
                "Meeting content",
                "bullet_points",
                "short",
                "important points only"
        );

        assertNotNull(result);
        assertTrue(result.contains("Meeting content"));
        assertTrue(result.contains("As short as possible"));
        assertTrue(result.contains("bullet_points"));
    }

    @Test
    void shouldBuildPromptWithoutAdditionalInstruction() {
        String result = summaryService.buildPrompt(
                "Content",
                "summary",
                "medium",
                null
        );

        assertNotNull(result);
        assertTrue(result.contains("Content"));
    }

    @Test
    void shouldBuildDecisionalPrompt() {
        String result = summaryService.buildPrompt(
                "Decision meeting",
                "decisional",
                "short",
                ""
        );

        assertTrue(result.contains("### Decisions"));
        assertTrue(result.contains("### Actions"));
        assertTrue(result.contains("Decision meeting"));
    }
}