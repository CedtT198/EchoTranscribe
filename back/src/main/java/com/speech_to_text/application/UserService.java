package com.speech_to_text.application;

import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import com.speech_to_text.domain.model.User;
import com.speech_to_text.domain.port.in.UserUserCase;
import com.speech_to_text.domain.port.out.UserRepository;

@Service
public class UserService implements UserUserCase {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

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
