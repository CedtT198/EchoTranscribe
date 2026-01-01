package com.speech_to_text.application.domain.port.in;

import org.springframework.web.multipart.MultipartFile;
import com.speech_to_text.application.domain.model.DTO.TranscribeDTO;

public interface TranscriptionUseCase {
    public String transcribe(MultipartFile file, TranscribeDTO settings);
}
