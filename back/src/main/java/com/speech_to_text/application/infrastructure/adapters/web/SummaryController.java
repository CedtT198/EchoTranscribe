package com.speech_to_text.application.infrastructure.adapters.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.speech_to_text.application.domain.port.in.SummaryUseCase;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/summary")
@AllArgsConstructor
public class SummaryController {

    private final SummaryUseCase summaryUseCase;
    
    @GetMapping("/summarize")
    public ResponseEntity<?> summarize(String content, String goal, String length, String additionalInsctruction) {
        return null;
    }
}
