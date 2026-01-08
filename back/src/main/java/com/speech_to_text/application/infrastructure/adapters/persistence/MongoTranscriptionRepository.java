package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.out.TranscriptionRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.TranscriptionDocument;
import lombok.AllArgsConstructor;

interface SpringDataTranscription extends MongoRepository<TranscriptionDocument, String> {
    List<TranscriptionDocument> findAllByAuth0Id(String auth0Id);

    @Query("""
    {
      ?#{[0] == null ? '{}' : {'auth0Id': [0]} },
      ?#{[1] == null ? '{}' : {'creationDate': {'$gte': [1]}} },
      ?#{[2] == null ? '{}' : {'creationDate': {'$lte': [2]}} },
      ?#{[3] == null || [3].trim().isEmpty() ? '{}' : {'content': {'$regex': [3], '$options': 'i'}} },
      ?#{[4] == null || [4].trim().isEmpty() ? '{}' : {'summary': {'$regex': [4], '$options': 'i'}} },
      ?#{[5] == null ? '{}' : {'transcriptionType': [5]} }
    }
    """)
    List<TranscriptionDocument> findByFilters(String auth0Id, LocalDate startDate, LocalDate endDate, String contentPhrase, String summaryPhrase, String transcriptionType);

    // Optional<TranscriptionDocument> findByAuth0IdAndType(String auth0Id, String transcribeType);
}

@Repository
@AllArgsConstructor
public class MongoTranscriptionRepository implements TranscriptionRepository {

    private SpringDataTranscription repo;
    private GenericMapper mapper;
    
    @Override
    public List<Transcription> findAll() {
        return mapper.mapList(repo.findAll(), Transcription.class);
    }

    @Override
    public List<Transcription> findByFilters(String auth0Id, LocalDate startDate, LocalDate endDate, String contentPhrase, String summaryPhrase, String transcriptionType) {
        return mapper.mapList(repo.findByFilters(auth0Id, startDate, endDate, contentPhrase, summaryPhrase, transcriptionType), Transcription.class);
    }

    @Override
    public List<Transcription> findAllByAuth0Id(String auth0Id) {
        return mapper.mapList(repo.findAllByAuth0Id(auth0Id), Transcription.class);
    }

    @Override
    public Transcription save(Transcription transcription) {
        TranscriptionDocument doc = mapper.map(transcription, TranscriptionDocument.class);
        return mapper.map(repo.save(doc), Transcription.class);
    }

    @Override
    public Transcription update(Transcription transcription) {
        TranscriptionDocument existing = repo.findById(transcription.getId()).orElse(null);
        if (existing == null) {
            return null;
        }
        return save(transcription);
    }

    @Override
    public boolean delete(String id) {
        Optional<TranscriptionDocument> existing = repo.findById(id);
        if (existing.isPresent()) {
            repo.delete(existing.get());
            return true;
        }
        return false;
    }
}
