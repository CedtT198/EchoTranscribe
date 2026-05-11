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
public class UserFilterDto {
    @JsonProperty("name")
    String name;
    
    @JsonProperty("firstName")
    String firstName;
    
    @JsonProperty("mail")
    String mail;
    
    @JsonProperty("startDate")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate startDate;
    
    @JsonProperty("endDate")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate endDate;
    
    @JsonProperty("country")
    String country;
}
