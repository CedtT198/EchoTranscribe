package com.speech_to_text.application.domain.model.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExportDTO {
    @JsonProperty("type")
    String type;

    @JsonProperty("transcription")
    Transcription transcription;
}
