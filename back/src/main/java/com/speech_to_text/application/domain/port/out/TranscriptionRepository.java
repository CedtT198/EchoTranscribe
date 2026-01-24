package com.speech_to_text.application.domain.port.out;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.speech_to_text.application.domain.model.DTO.PerformanceStatDTO;
import com.speech_to_text.application.domain.model.transcription.Transcription;

public interface TranscriptionRepository {
    public PerformanceStatDTO getPerfDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception;
    public List<Transcription> findAll();
    public Page<Transcription> findAllByAuth0Id(String id, Pageable pageable);
    public Transcription save(Transcription transcription);
    public Transcription update(Transcription transcription);
    public boolean delete(String id);
    public Page<Transcription> findByFilters(String auth0Id, LocalDate startDate, LocalDate endDate, String contentPhrase, String summaryPhrase, String transcriptionType, Pageable pageable);
}
