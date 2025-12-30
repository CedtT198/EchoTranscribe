package com.speech_to_text.application.domain.port.out;

import java.time.LocalDate;
import java.util.List;
import com.speech_to_text.application.domain.model.User;

public  interface UserRepository {
    List<User> findAll();
    List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement);
    User findById(String id);
    User findByMail(String mail);
    User save(User user);
    User findByAuth0Id(String auth0Id);
    User update(User user);
    boolean delete(String auth0Id);
}
