package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.others.QA;
import com.speech_to_text.application.domain.port.in.QAUseCase;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/qa")
public class QAController {
    private QAUseCase qaUseCase;
  
    @GetMapping("/findAll")
    public ResponseEntity<List<QA>> findAll(@RequestParam(required = false) String about) {
        if (about != null && !about.isEmpty()) {
            return ResponseEntity.ok(qaUseCase.findAllAbout(about));
        }
        return ResponseEntity.ok(qaUseCase.findAll());
    }
}

