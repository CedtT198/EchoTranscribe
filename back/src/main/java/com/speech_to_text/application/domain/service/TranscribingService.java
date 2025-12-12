package com.speech_to_text.application.domain.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.speech_to_text.application.domain.port.in.TranscribingUseCase;

@Service
public class TranscribingService implements TranscribingUseCase {

    @Override
    public String GoogleSpeechToText(boolean diarizationEnbale, int minPeople, int maxPeople, String file, List<String> languages) {
        return "";
    }
}
