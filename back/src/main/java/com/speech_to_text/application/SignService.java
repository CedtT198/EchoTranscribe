package com.speech_to_text.application;

import org.springframework.stereotype.Service;
// import java.util.UUID;
import com.speech_to_text.domain.model.User;
import com.speech_to_text.domain.port.in.SignUseCase;
import com.speech_to_text.domain.port.out.UserRepository;

@Service
public class SignService implements SignUseCase {
    private final UserRepository userRepository;
    private final SecurityService securityService;

    public SignService(UserRepository userRepository, SecurityService securityService) {
        this.userRepository = userRepository;
        this.securityService = securityService;
    }
    

    @Override
    public User addUser(User user) throws Exception {
        User existingUser = userRepository.findByMail(user.getMail());
        if (existingUser != null) {
            throw new Exception("User with this email already exists.");
        }
        return userRepository.save(user);
    }
    

    @Override
    public User checkLogin(String email, String password) throws Exception {
        User user = userRepository.findByMail(email);
        if (user != null) {
            String passEncoded = securityService.crypt(password);
            if (user.getPassword().equals(passEncoded)) {
                // String token = UUID.randomUUID().toString();
                // user.setToken(token);
                // userRepository.save(user);
                return user; 
            }
            else {
                throw new Exception("Wrong password.");
            }
        }
        throw new Exception("User doesn't exist.");
    }
    
}
