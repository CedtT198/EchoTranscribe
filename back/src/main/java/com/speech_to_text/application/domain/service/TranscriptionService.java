package com.speech_to_text.application.domain.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;

@Service
public class TranscriptionService implements TranscriptionUseCase {

    @Override
    public String transcribe(MultipartFile file) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'transcribe'");
    }
}
