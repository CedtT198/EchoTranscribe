package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.speech_to_text.application.domain.model.user.User;
import com.speech_to_text.application.domain.port.out.UserRepository;
import com.speech_to_text.application.domain.service.SignService;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserDocument;

// import com.speech_to_text.domain.model.TokensResponse;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/sign")
@Validated
@AllArgsConstructor
public class SignController {
    private SignService signService;
    private final UserRepository userRepository;
    // private JwtService jwtUtil;

    @PostMapping("/in")
    ResponseEntity<?> signin(@RequestBody User user) {
        try {
            User userCon= signService.checkLogin(user.getMail(), "");
            // User userCon= signService.checkLogin(user.getMail(), user.getPassword());

            // String accessToken = jwtUtil.generateAccessToken(user);
            // String refreshToken = jwtUtil.generateRefreshToken(user);

            // return ResponseEntity.status(200).body(new TokensResponse(accessToken, refreshToken));
            // tokony systeme de token no mande eto

            return ResponseEntity.status(200).body(userCon);
        } catch (Exception e) {
            Map<String, String> res = new HashMap<>();
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }
    
    @PostMapping("/validate")
    ResponseEntity<?> validate(@Valid @RequestBody UserDocument user) {
        Map<String, String> res = new HashMap<>();

        // if (!user.getPassword().equals(user.getConfirmPassword())) {
        if (!"".equals(user.getConfirmPassword())) {
            res.put("error", "`Password` and `Confirm Password` must match.");
            return ResponseEntity.status(401).body(res);
        }
        
        User existingUser = userRepository.findByMail(user.getMail());
        if (existingUser != null) {
            res.put("error", "User with this email already exists.");
            return ResponseEntity.status(401).body(res);
        }
        
        res.put("success", "Form has been validated.");
        return ResponseEntity.status(200).body(res);
    }
}
