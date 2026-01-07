package com.speech_to_text.application.domain.port.out;

import java.time.LocalDate;
import java.util.List;
import com.speech_to_text.application.domain.model.transcription.Transcription;

public interface TranscriptionRepository {
    public List<Transcription> findAll();
    public List<Transcription> findAllBetween(LocalDate startDate, LocalDate endDate);
    public List<Transcription> findAllBetween(String auth0id, LocalDate startDate, LocalDate endDate);
    public List<Transcription> searchInContent(String phrase);
    public List<Transcription> searchInSummary(String phrase);
    public List<Transcription> findAllByAuth0Id(String id);
    public Transcription save(Transcription transcription);
    public Transcription update(String auth0id, Transcription transcription);
    public boolean delete(String auth0id);
}
