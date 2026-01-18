package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import java.time.LocalDate;
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

    String auth0Id;
    String file;
    String language;
    String content;
    String title;
    String subtitle;
    String summary;
    String goal;
    String length; // option of the summarized content
    String fileDuration;
    String additionalInstruction;
    String transcriptionType;
    LocalDate creationDate;
}
