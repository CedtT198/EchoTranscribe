package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.port.in.PaymentUseCase;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/payment")
public class PaymentController {
    
    PaymentUseCase paymentUseCase;

    @PostMapping("/checkout")
    public Map<String, String> createCheckout(@RequestParam String plan) throws Exception {
        return paymentUseCase.createCheckout(plan);
    }

    @PostMapping("/subscription/cancel")
    public ResponseEntity<?> cancelSubscription(@RequestParam String subscriptionId) throws Exception {
        Map<String, String> res = new HashMap<>();
        try {
            paymentUseCase.cancelSUbscription(subscriptionId);
            res.put("success", "Your subscription has been canceled successfuly");
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }
}
