package com.speech_to_text.application.domain.port.in;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.WebSocketSession;
import com.speech_to_text.application.domain.model.DTO.TranscribeSettings;

public interface TranscriptionUseCase {
    public String transcribeShortFile(MultipartFile file, TranscribeSettings settings) throws Exception;
    public String transcribeLongFile(MultipartFile file, TranscribeSettings settings) throws Exception;
    public void transcribeLongFileAsync(MultipartFile file, TranscribeSettings settings, String taskId) throws Exception;
    public void initStreamingConfig(WebSocketSession session, TranscribeSettings settings) throws Exception;
    public TranscribeSettings findSettings(String auth0Id, String type);
}
