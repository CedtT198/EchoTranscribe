package com.speech_to_text.application.domain.service;

import java.util.Random;
import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import com.speech_to_text.application.domain.port.in.OTPUseCase;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OTPService implements OTPUseCase {
    
    private final StringRedisTemplate redisTemplate;

    @Override
    public void generate(String email) {
        long minutes = 3; // alaina anaty fichier de conf application.properties
        String code = String.format("%06d", new Random().nextInt(999999));
        String key = "verify:"+email;
        redisTemplate.opsForValue().set(key, code, minutes, TimeUnit.MINUTES);
        
        System.out.println("CODE de verification: "+code);
        // envoyer code par email
    }

    @Override
    public String getCode(String email) {
        return redisTemplate.opsForValue().get("verify:" + email);
    }

    @Override
    public boolean verify(String email, String code) {
        String key = "verify:" + email;
        String storedCode = redisTemplate.opsForValue().get(key);
        if (storedCode != null && storedCode.equals(code)) {
            redisTemplate.delete(key);
            return true;
        }
        return false;
    }
}
