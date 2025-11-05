package com.speech_to_text.application.domain.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import com.speech_to_text.application.domain.port.in.UserUserCase;
import com.speech_to_text.application.domain.port.out.UserRepository;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserEntity;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService implements UserUserCase {

    private final UserRepository userRepo;

    @Override
    public List<UserEntity> findAll() {
        return userRepo.findAll();
    }

    @Override
    public List<UserEntity> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement) {
        return userRepo.findByAbonnements(date1, date2, typeAbonnement);
    }

    @Override
    public UserEntity findById(String id) {
        return userRepo.findById(id);
    }

    @Override
    public UserEntity findByMail(String mail) {
        return userRepo.findByMail(mail);
    }

    @Override
    public UserEntity save(UserEntity user) {
        return userRepo.save(user);
    }
}
