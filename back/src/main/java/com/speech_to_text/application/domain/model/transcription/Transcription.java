package com.speech_to_text.application.domain.model.transcription;

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
    String length;
    String additionalInstruction;
    String transcriptionType;
    String creationDate;
}
