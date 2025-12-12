package com.speech_to_text.application.domain.service;

import org.springframework.stereotype.Service;

import com.speech_to_text.application.domain.model.User;
// import java.util.UUID;
import com.speech_to_text.application.domain.port.in.SignUseCase;
import com.speech_to_text.application.domain.port.out.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SignService implements SignUseCase {
    private final UserRepository userRepository;
    // private final SecurityService securityService;

    @Override
    public User checkLogin(String email, String password) throws Exception {
        User user = userRepository.findByMail(email);
        if (user != null) {
            // String passEncoded = securityService.crypt(password);
            if (user.getPassword().equals(password)) {
                return user; 
            }
            else {
                throw new Exception("Wrong password.");
            }
        }
        throw new Exception("User with this email doesn't exist.");
    }
    
}
