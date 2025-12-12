package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.OTP;
import com.speech_to_text.application.domain.port.in.OTPUseCase;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/otp")
@AllArgsConstructor
public class OTPController {

    private final OTPUseCase otpUseCase;

    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody OTP otp) {
        otpUseCase.generate(otp.getEmail());
        
        Map<String, String> res = new HashMap<>();
        res.put("success", "New verification code sent.");

        return ResponseEntity.status(200).body(res);
    }


    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody OTP request) {
        boolean expire = otpUseCase.verify(request.getEmail(), request.getCode());
        
        Map<String, String> res = new HashMap<>();
        if (expire) {
            res.put("success", "Your inscription has been approved.");
            return ResponseEntity.status(200).body(res);
        }
        else {
            res.put("error", "Invalid code or expired.");
            return ResponseEntity.status(400).body(res);
        }
    }
}
