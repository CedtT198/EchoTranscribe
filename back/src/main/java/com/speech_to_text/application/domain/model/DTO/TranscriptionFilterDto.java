package com.speech_to_text.application.domain.model.DTO;

import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TranscriptionFilterDto {
    @JsonProperty("auth0Id")
    String auth0Id;
    
    @JsonProperty("startDate")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate startDate;
    
    @JsonProperty("endDate")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate endDate;
    
    @JsonProperty("contentPhrase")
    String contentPhrase;
    
    @JsonProperty("summaryPhrase")
    String summaryPhrase;
    
    @JsonProperty("transcriptionType")
    String transcriptionType;
}
