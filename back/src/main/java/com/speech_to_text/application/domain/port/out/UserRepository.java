package com.speech_to_text.application.domain.port.out;

import java.time.LocalDate;
import java.util.List;

import com.speech_to_text.application.domain.model.user.User;

public  interface UserRepository {
    public List<User> findAll();
    public List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement);
    public User findById(String id);
    public User findByMail(String mail);
    public User save(User user);
    public User findByAuth0Id(String auth0Id);
    public User update(User user);
    public boolean delete(String auth0Id);
}
