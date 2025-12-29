package com.speech_to_text.application.domain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.speech_to_text.application.domain.model.QA;
import com.speech_to_text.application.domain.port.in.QAUseCase;
import com.speech_to_text.application.domain.port.out.QARepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QAService implements QAUseCase{
    
    private final QARepository qaRepo;

    @Override
    public List<QA> findAll() {
        return qaRepo.findAll();
    }
    
    @Override
    public List<QA> findAllAbout(String about) {
        return qaRepo.findAllAbout(about);
    }
    
}
