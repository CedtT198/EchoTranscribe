package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.DTO.TranscriptionSettings;
import com.speech_to_text.application.domain.port.out.TranscriptionSettingsRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.TranscriptionSettingsDocument;
import lombok.AllArgsConstructor;

interface SpringDataTranscriptionSettings extends MongoRepository<TranscriptionSettingsDocument, String> {
    Optional<TranscriptionSettingsDocument> findByAuth0Id(String auth0Id);
    Optional<TranscriptionSettingsDocument> findByAuth0IdAndType(String auth0Id, String transcribeType);
}

@Repository
@AllArgsConstructor
public class MongoTranscriptionSettingsRepository implements TranscriptionSettingsRepository {

    private SpringDataTranscriptionSettings repo;
    private GenericMapper mapper;

    @Override
    public TranscriptionSettings findByAuth0IdAndType(String auth0Id, String transcribeType) {
        TranscriptionSettingsDocument settingsDoc =  repo.findByAuth0IdAndType(auth0Id, transcribeType).orElse(null);
        return mapper.map(settingsDoc, TranscriptionSettings.class);
    }    

}
