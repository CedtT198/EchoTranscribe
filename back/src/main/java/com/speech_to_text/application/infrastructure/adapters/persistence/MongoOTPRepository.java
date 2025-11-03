package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.OTP;
import com.speech_to_text.application.domain.model.User;
import com.speech_to_text.application.domain.port.out.OTPRepository;
import com.speech_to_text.application.domain.port.out.UserRepository;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.OTPEntity;

interface SpringDataOTP extends MongoRepository<OTPRepository, String> {
    Optional<OTPEntity> findByKey(String mail);
}

@Repository
public class MongoOTPRepository implements OTPRepository{

    private final SpringDataOTP repo;

    public MongoOTPRepository(SpringDataOTP repo) {
        this.repo = repo;
    }

    @Override
    public OTPEntity get(String key) {
        return repo.findByKey(key).orElse(null);
    }

    @Override
    public int save(OTPEntity otp) {
        // return repo.save(otp);
        return 0;
    }    
}
