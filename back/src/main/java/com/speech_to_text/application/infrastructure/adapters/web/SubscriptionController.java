package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.SubscriptionType;
import com.speech_to_text.application.domain.port.in.SubscriptionTypeUseCase;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/subscription")
public class SubscriptionController {
    private SubscriptionTypeUseCase subTypeUseCase;
    // private UserService userService;
  
    @GetMapping("/type/findAll")
    public ResponseEntity<List<SubscriptionType>> findAll() {
        return ResponseEntity.ok(subTypeUseCase.findAll());
    }

}
