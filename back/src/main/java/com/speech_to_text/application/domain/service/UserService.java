package com.speech_to_text.application.domain.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import com.speech_to_text.application.domain.model.User;
import com.speech_to_text.application.domain.port.in.UserUseCase;
import com.speech_to_text.application.domain.port.out.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService implements UserUseCase {

    private final UserRepository userRepo;

    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }

    @Override
    public List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement) {
        return userRepo.findByAbonnements(date1, date2, typeAbonnement);
    }

    @Override
    public User findById(String id) {
        return userRepo.findById(id);
    }

    @Override
    public User findByMail(String mail) {
        return userRepo.findByMail(mail);
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }
}
