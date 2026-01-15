package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.speech_to_text.application.domain.port.in.SummaryUseCase;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;

@Controller
@RequestMapping("/summary")
@AllArgsConstructor
public class SummaryController {

    private final SummaryUseCase summaryUseCase;
    
    @PostMapping("/summarize")
    public Mono<ResponseEntity<String>> summarize(@RequestBody Map<String, String> data) {
        String content = data.get("content");
        String goal = data.get("goal");
        String length = data.get("length");
        String additionalInstruction = data.get("additionalInstruction");
        
        System.out.println("api openAI vohantso");
        String prompt = summaryUseCase.buildPrompt(content, goal, length, additionalInstruction);

        return summaryUseCase.summarize(prompt)
            .map(ResponseEntity::ok)
            .onErrorResume(e -> Mono.just(ResponseEntity.status(401).body(e.getMessage())));
    }
}
