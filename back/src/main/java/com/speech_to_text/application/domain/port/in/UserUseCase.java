package com.speech_to_text.application.domain.port.in;

import java.time.LocalDate;
import java.util.List;
import com.speech_to_text.application.domain.model.User;

public  interface UserUseCase {
    List<User> findAll();
    List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement);
    User findByAuth0Id(String auth0Id);
    User findByMail(String mail);
    User save(User user);
    User getOrCreate(String auth0Id, String email);
    User update(User user);
    boolean delete(String auth0Id);
    boolean block(String auth0Id);
}
