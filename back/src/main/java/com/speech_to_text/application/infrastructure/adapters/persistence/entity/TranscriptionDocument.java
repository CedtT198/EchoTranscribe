package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "transcription")
public class TranscriptionDocument {
    @Id
    String id;

    String auth0id;
    String file;
    String language;
    String content;
    String title;
    String subtitle;
    String summary;
    String goal;
    String length;
    String additional_instruction;
    String transcription_type;
    String creation_Date;
}
