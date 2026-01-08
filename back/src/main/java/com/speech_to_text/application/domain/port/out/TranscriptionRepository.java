package com.speech_to_text.application.domain.port.out;

import java.time.LocalDate;
import java.util.List;
import com.speech_to_text.application.domain.model.transcription.Transcription;

public interface TranscriptionRepository {
    public List<Transcription> findAll();
    public List<Transcription> findAllByAuth0Id(String id);
    public Transcription save(Transcription transcription);
    public Transcription update(Transcription transcription);
    public boolean delete(String id);
    public List<Transcription> findByFilters(String auth0Id, LocalDate startDate, LocalDate endDate, String contentPhrase, String summaryPhrase, String transcriptionType)
}
