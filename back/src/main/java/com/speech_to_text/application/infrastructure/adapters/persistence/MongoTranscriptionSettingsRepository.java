package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.DTO.TranscribeSettings;
import com.speech_to_text.application.domain.port.out.TranscriptionSettingsRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.TranscribeSettingsDocument;
import lombok.AllArgsConstructor;

interface SpringDataUser extends MongoRepository<TranscribeSettingsDocument, String> {
    Optional<TranscribeSettingsDocument> findByAuth0Id(String auth0Id);
    Optional<TranscribeSettingsDocument> findByAuth0IdAndType(String auth0Id, String transcribeType);
}

@Repository
@AllArgsConstructor
public class MongoTranscriptionSettingsRepository implements TranscriptionSettingsRepository {

    private SpringDataUser repo;
    private GenericMapper mapper;

    @Override
    public TranscribeSettings findByAuth0IdAndType(String auth0Id, String transcribeType) {
        TranscribeSettingsDocument settingsDoc =  repo.findByAuth0IdAndType(auth0Id, transcribeType).orElse(null);
        return mapper.map(settingsDoc, TranscribeSettings.class);
    }    

}
