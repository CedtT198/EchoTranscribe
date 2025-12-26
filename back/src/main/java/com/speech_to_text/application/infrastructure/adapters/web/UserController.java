package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.User;
import com.speech_to_text.application.domain.service.BCryptService;
import com.speech_to_text.application.domain.service.UserService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private UserService userService;
    private BCryptService bcryptService;
  
    @GetMapping("/findAll")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody User user) {
        Map<String, String> res = new HashMap<>();
        
        String passEncoded = bcryptService.hash(user.getPassword());
        user.setPassword(passEncoded);

        userService.save(user);
        System.out.println(user.getMail()+" created an account.");
        
        res.put("success", "Your account has been created, sign in now.");
        return ResponseEntity.status(200).body(res);
    }
}
