package com.speech_to_text.application.domain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.speech_to_text.application.domain.model.SubscriptionType;
import com.speech_to_text.application.domain.port.in.SubscriptionTypeUseCase;
import com.speech_to_text.application.domain.port.out.SubscriptionTypeRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SubscriptionTypeService implements SubscriptionTypeUseCase{
    
    private final SubscriptionTypeRepository subTypeRepo;

    @Override
    public List<SubscriptionType> findAll() {
        return subTypeRepo.findAll();
    }
    
}
