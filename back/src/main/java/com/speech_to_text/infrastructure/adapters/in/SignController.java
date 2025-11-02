package com.speech_to_text.infrastructure.adapters.in;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.JwtUtil;
import com.speech_to_text.application.SignService;
import com.speech_to_text.domain.model.TokensResponse;
import com.speech_to_text.domain.model.User;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/sign")
@Validated
public class SignController {
    @Autowired
    private SignService signService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/in")
    ResponseEntity<?> signin(@RequestBody User user) {
        try {
            signService.checkLogin(user.getMail(), user.getPassword());

            String accessToken = jwtUtil.generateAccessToken(user);
            String refreshToken = jwtUtil.generateRefreshToken(user);

            return ResponseEntity.status(200).body(new TokensResponse(accessToken, refreshToken));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    
    @PostMapping("/up")
    ResponseEntity<?> signup(@Valid @RequestBody User user) {
        try {
            User userCon = signService.addUser(user);
            return ResponseEntity.status(200).body(userCon);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
