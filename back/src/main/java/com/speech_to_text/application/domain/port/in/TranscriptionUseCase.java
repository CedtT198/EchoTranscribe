package com.speech_to_text.application.domain.port.in;

import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.WebSocketSession;
import com.speech_to_text.application.domain.model.DTO.PerformanceStatDTO;
import com.speech_to_text.application.domain.model.DTO.TranscriptionFilterDto;
import com.speech_to_text.application.domain.model.DTO.TranscriptionSettings;
import com.speech_to_text.application.domain.model.transcription.Transcription;

public interface TranscriptionUseCase {
    public PerformanceStatDTO getPerfDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception;
    public Page<Transcription> findByFilters(TranscriptionFilterDto dto, Pageable pageable);
    public List<Transcription> findAll();
    public Page<Transcription> findAllByAuth0Id(String id, Pageable pageable);
    public Transcription save(Transcription transcription) throws Exception;
    public Transcription update(Transcription transcription);
    public boolean delete(String id);
    public String transcribeShortFile(MultipartFile file, TranscriptionSettings settings) throws Exception;
    public String transcribeLongFile(MultipartFile file, TranscriptionSettings settings) throws Exception;
    public void transcribeLongFileAsync(MultipartFile file, TranscriptionSettings settings, String taskId) throws Exception;
    public void transcribeLongFileAsync(Path tempInputFile, String originalFilename, TranscriptionSettings settings, String taskId) throws Exception;
    public void initStreamingConfig(WebSocketSession session, TranscriptionSettings settings) throws Exception;
    public TranscriptionSettings findSettings(String auth0Id, String type);
}
