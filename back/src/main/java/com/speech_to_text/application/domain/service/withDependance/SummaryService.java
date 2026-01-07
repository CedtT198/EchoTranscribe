package com.speech_to_text.application.domain.service.withDependance;

import org.springframework.stereotype.Service;
import com.speech_to_text.application.domain.port.in.SummaryUseCase;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SummaryService implements SummaryUseCase {

    @Override
    public String buildPrompt(String content, String goal, String length, String additionalInsctruction) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'buildPrompt'");
    }

    @Override
    public String summarize(String prompt) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'summarize'");
    }
    
}
