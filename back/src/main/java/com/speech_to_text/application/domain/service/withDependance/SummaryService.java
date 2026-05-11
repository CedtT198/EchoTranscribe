package com.speech_to_text.application.domain.service.withDependance;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.speech_to_text.application.domain.port.in.SubscriptionUseCase;
import com.speech_to_text.application.domain.port.in.SummaryUseCase;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class SummaryService implements SummaryUseCase {

    private final WebClient webClient;
    private final SubscriptionUseCase subUseCase;

    @Override
    public String buildPrompt(String content, String goal, String length, String adi) {
        if (adi == null || adi.isEmpty() || adi.isBlank())
        {
            adi = "";
        }
        if (length.toLowerCase().equals("short")) {
            length = "As short as possible";
        }

        String prompt = """
            You are an expert summarization assistant.

            Task:
            Summarize the content below in the same language.

            Constraints:
            - Format: %s
            - Length: %s
            - Do not add information not present in the content
            - Preserve key ideas and decisions
            %s

            Content:
            %s
        """;
        if (goal.toLowerCase().equals("decisional")) {
            prompt = """
                You are an expert summarization assistant.

                Task:
                Summarize the content below in the same language.

                Constraints:
                - Format: %s
                - Length: %s
                - Do not add any information that is not present in the content
                - Do not invent names, dates, numbers, or outcomes
                - Preserve key decisions, actions, open questions, and risks/blockers when present

                ### Decisions
                - <decision> (Owner: <name if present>, Due: <date if present>)

                ### Actions
                - <action> (Owner: <name if present>, Due: <date if present>)

                ### Open questions
                - <question to resolve>

                ### Risks / Blockers
                - <risk or blocker>

                DECISIONAL rules:
                - Extract only decisions, actions, open questions, and risks/blockers. Do NOT write background/context.
                - If a section has no items, write: None
                - Do NOT infer anything: if it's not explicitly stated, don't include it
                - Keep each bullet under 20 words
                - Prefer concrete wording from the text
                - If owner or due date is not present, omit the parentheses entirely

                %s

                Content:
                %s
            """;
        }

        return prompt.formatted(goal, length, adi, content); 
    }

    @Override
    public Mono<String> summarize(String prompt, String auth0id) throws Exception {
        Map<String, Object> requestBody = Map.of("model", "gpt-4.1", "input", prompt);

        return webClient.post()
            .uri("/responses")
            .bodyValue(requestBody)
            .retrieve()
            .onStatus(HttpStatusCode::isError, response ->
                    response.bodyToMono(String.class)
                            .map(RuntimeException::new)
            )
            .bodyToMono(Map.class)
            .doOnNext(response -> {
                try {
                    subUseCase.consumeCredit(auth0id, 4);
                } catch (Exception e) {
                    throw new RuntimeException(e.getMessage());
                }
            })
            .map(response -> {
                var output = (List<Map<String, Object>>) response.get("output");
                var content = (List<Map<String, Object>>) output.get(0).get("content");
                return content.get(0).get("text").toString();
            });
    }
}
