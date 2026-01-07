package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.out.TranscriptionRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.TranscriptionDocument;
import lombok.AllArgsConstructor;

interface SpringDataTranscription extends MongoRepository<TranscriptionDocument, String> {
    Optional<TranscriptionDocument> findByAuth0Id(String auth0Id);
    Optional<TranscriptionDocument> findByAuth0IdAndType(String auth0Id, String transcribeType);
}

@Repository
@AllArgsConstructor
public class MongoTranscriptionRepository implements TranscriptionRepository {

    private SpringDataTranscription repo;
    private GenericMapper mapper;
    
    @Override
    public List<Transcription> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }
    @Override
    public List<Transcription> findAllBetween(LocalDate startDate, LocalDate endDate) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllBetween'");
    }
    @Override
    public List<Transcription> findAllBetween(String auth0id, LocalDate startDate, LocalDate endDate) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllBetween'");
    }
    @Override
    public List<Transcription> searchInContent(String phrase) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchInContent'");
    }
    @Override
    public List<Transcription> searchInSummary(String phrase) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchInSummary'");
    }
    @Override
    public List<Transcription> findAllByAuth0Id(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllByAuth0Id'");
    }
    @Override
    public Transcription save(Transcription transcription) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }
    @Override
    public Transcription update(String auth0id, Transcription transcription) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }
    @Override
    public boolean delete(String auth0id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }


}
