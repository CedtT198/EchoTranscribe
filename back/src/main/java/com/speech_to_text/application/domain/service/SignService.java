package com.speech_to_text.application.domain.service;

import org.springframework.stereotype.Service;
// import java.util.UUID;
import com.speech_to_text.application.domain.model.User;
import com.speech_to_text.application.domain.port.in.SignUseCase;
import com.speech_to_text.application.domain.port.out.UserRepository;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserEntity;

@Service
public class SignService implements SignUseCase {
    private final UserRepository userRepository;
    private final SecurityService securityService;

    public SignService(UserRepository userRepository, SecurityService securityService) {
        this.userRepository = userRepository;
        this.securityService = securityService;
    }
    

    @Override
    public UserEntity addUser(UserEntity user) throws Exception {
        UserEntity existingUser = userRepository.findByMail(user.getMail());
        if (existingUser != null) {
            throw new Exception("User with this email already exists.");
        }
        // String passEncoded = securityService.crypt(user.getPassword());
        // user.setPassword(passEncoded);
        return userRepository.save(user);
    }
    

    @Override
    public UserEntity checkLogin(String email, String password) throws Exception {
        UserEntity user = userRepository.findByMail(email);
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
