package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.service.UserService;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserEntity;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
  
    @GetMapping("/findAll")
    public ResponseEntity<List<UserEntity>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }
}
