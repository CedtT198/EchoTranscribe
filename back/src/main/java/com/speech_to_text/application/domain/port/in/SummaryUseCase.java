package com.speech_to_text.application.domain.port.in;

import reactor.core.publisher.Mono;

public interface SummaryUseCase {
    public String buildPrompt(String content, String goal, String length, String additionalInsctruction);
    public Mono<String> summarize(String prompt, String auth0id) throws Exception;
}
