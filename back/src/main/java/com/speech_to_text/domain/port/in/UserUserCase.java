package com.speech_to_text.domain.port.in;

import java.time.LocalDate;
import java.util.List;
import com.speech_to_text.domain.model.User;

public  interface UserUserCase {
    List<User> findAll();
    List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement);
    User findById(int id);
    User findByMail(String mail);
    User save();
}
