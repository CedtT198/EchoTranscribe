package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "transcription_settings")
public class TranscriptionSettingsDocument {
    @Id
    String id;
    
    String type;
    String auth0Id;
    String mainLanguage;
    Boolean isStreaming;
    String location;
    Boolean useAlternativeLanguages;
    List<String> alternativeLanguages;
    Boolean withAutomaticPunctuation;
    Boolean withWordTimeOffsets;
    Boolean withWordConfidence;
    Boolean filterProfanity;
    Boolean withDiarization;
    Integer minPeople;
    Integer maxPeople;
    Boolean useSpeechContexts;
    float boostSpeechContexts;
    List<String> speechContextsPhrases;
}