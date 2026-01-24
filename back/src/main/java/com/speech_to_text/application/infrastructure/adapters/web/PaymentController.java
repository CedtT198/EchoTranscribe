package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.DTO.CheckoutDTO;
import com.speech_to_text.application.domain.port.in.PaymentUseCase;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/payment")
public class PaymentController {
    
    PaymentUseCase paymentUseCase;

    @PostMapping("/checkout")
    public Map<String, String> createCheckout(@RequestBody CheckoutDTO checkout) throws Exception {        
        String auth0Id = checkout.getAuth0Id();
        String email = checkout.getEmail();
        String plan = checkout.getPlan();
        return paymentUseCase.createCheckout(auth0Id, email, plan);
    }

    @PostMapping("/subscription/cancel/{subId}")
    public ResponseEntity<?> cancelSubscription(@PathVariable String subId) throws Exception {
        System.out.println("SUB ID = "+subId);
        Map<String, String> res = new HashMap<>();
        try {
            paymentUseCase.cancelSubscriptionAtPeriodEnd(subId);
            res.put("success", "Your subscription has been canceled successfuly");
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }

}
