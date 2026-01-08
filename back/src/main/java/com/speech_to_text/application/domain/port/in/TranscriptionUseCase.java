package com.speech_to_text.application.domain.port.in;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.WebSocketSession;
import com.speech_to_text.application.domain.model.DTO.TranscriptionFilterDto;
import com.speech_to_text.application.domain.model.DTO.TranscriptionSettings;
import com.speech_to_text.application.domain.model.transcription.Transcription;

public interface TranscriptionUseCase {
    public List<Transcription> findByFilters(TranscriptionFilterDto dto);
    public List<Transcription> findAll();
    public List<Transcription> findAllByAuth0Id(String id);
    public Transcription save(Transcription transcription);
    public Transcription update(Transcription transcription);
    public boolean delete(String id);
    public String transcribeShortFile(MultipartFile file, TranscriptionSettings settings) throws Exception;
    public String transcribeLongFile(MultipartFile file, TranscriptionSettings settings) throws Exception;
    public void transcribeLongFileAsync(MultipartFile file, TranscriptionSettings settings, String taskId) throws Exception;
    public void initStreamingConfig(WebSocketSession session, TranscriptionSettings settings) throws Exception;
    public TranscriptionSettings findSettings(String auth0Id, String type);
}
