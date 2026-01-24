package com.speech_to_text.application.domain.model.transcription;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transcription {
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
    Double fileDuration;
    String additionalInstruction;
    String transcriptionType;
    LocalDate creationDate;
}
