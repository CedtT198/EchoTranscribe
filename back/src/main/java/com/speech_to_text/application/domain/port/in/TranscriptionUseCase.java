package com.speech_to_text.application.domain.port.in;

import org.springframework.web.multipart.MultipartFile;

public interface TranscriptionUseCase {
    public String transcribe(MultipartFile file);
}
