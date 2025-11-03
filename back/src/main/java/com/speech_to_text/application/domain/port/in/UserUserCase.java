package com.speech_to_text.application.domain.port.in;

import java.time.LocalDate;
import java.util.List;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.UserEntity;

public  interface UserUserCase {
    List<UserEntity> findAll();
    List<UserEntity> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement);
    UserEntity findById(String id);
    UserEntity findByMail(String mail);
    UserEntity save(UserEntity user);
}
