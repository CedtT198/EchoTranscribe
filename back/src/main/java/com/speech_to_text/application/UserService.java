package com.speech_to_text.application;

import java.time.LocalDate;
import java.util.List;
import com.speech_to_text.domain.model.User;
import com.speech_to_text.domain.port.in.UserUserCase;

public class UserService implements UserUserCase {

    @Override
    public List<User> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByAbonnements'");
    }

    @Override
    public User findById(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public User findByMail(String mail) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByMail'");
    }

    @Override
    public User save() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }
    
}
