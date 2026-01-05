package com.speech_to_text.application.domain.port.in;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.WebSocketSession;
import com.speech_to_text.application.domain.model.DTO.TranscribeSettingsDTO;

public interface TranscriptionUseCase {
    public String transcribeShortFile(MultipartFile file, TranscribeSettingsDTO settings) throws Exception;
    public String transcribeLongFile(MultipartFile file, TranscribeSettingsDTO settings) throws Exception;
    public void transcribeLongFileAsync(MultipartFile file, TranscribeSettingsDTO settings, String taskId) throws Exception;
    public void stream(WebSocketSession session, TranscribeSettingsDTO settings) throws Exception;
}
