package com.speech_to_text.application.domain.port.in;

import java.util.List;

public interface TranscribingUseCase {
    public String GoogleSpeechToText(boolean diarizationEnbale, int minPeople, int maxPeople, String file, List<String> languages);
}
