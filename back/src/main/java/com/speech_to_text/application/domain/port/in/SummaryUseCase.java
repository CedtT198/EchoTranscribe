package com.speech_to_text.application.domain.port.in;

public interface SummaryUseCase {
    public String buildPrompt(String content, String goal, String length, String additionalInsctruction);
    public String summarize(String prompt);
}
