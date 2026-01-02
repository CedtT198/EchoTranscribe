package com.speech_to_text.application.domain.port.in;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;
import com.speech_to_text.application.domain.model.DTO.TranscribeSettingsDTO;

public interface TranscriptionUseCase {
    public String transcribe(MultipartFile file, TranscribeSettingsDTO settings) throws IOException, InterruptedException;
}
