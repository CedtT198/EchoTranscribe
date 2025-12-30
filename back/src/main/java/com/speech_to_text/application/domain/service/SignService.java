// package com.speech_to_text.application.domain.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.speech_to_text.application.domain.model.User;
// // import java.util.UUID;
// import com.speech_to_text.application.domain.port.in.SignUseCase;
// import com.speech_to_text.application.domain.port.out.UserRepository;
// import lombok.AllArgsConstructor;

// @Service
// @AllArgsConstructor
// public class SignService implements SignUseCase {
//     @Autowired
//     private PasswordEncoder passwordEncoder;
//     private final UserRepository userRepository;

//     @Override
//     public User checkLogin(String email, String password) throws Exception {
//         User user = userRepository.findByMail(email);
//         if (user != null) {
//             if (passwordEncoder.matches(password, user.getPassword())) {
//             // if (user.getPassword().equals(password)) {
//                 return user; 
//             }
//             else {
//                 throw new Exception("Wrong password.");
//             }
//         }
//         throw new Exception("User with this email doesn't exist.");
//     }
    
// }
