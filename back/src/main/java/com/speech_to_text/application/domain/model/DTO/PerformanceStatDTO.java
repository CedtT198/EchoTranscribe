package com.speech_to_text.application.domain.model.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceStatDTO {
    @JsonProperty("most_used_language")
    String mostUsedLanguage;
    
    @JsonProperty("total_hours_transcribed")
    Double totalHoursTranscribed;

    @JsonProperty("total_transcriptions")
    Integer totalTranscriptions;
    
    @JsonProperty("transcriptions")
    List<MonthlyCountDTO> transcriptions;
}
