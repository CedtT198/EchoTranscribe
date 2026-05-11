package com.speech_to_text.application.domain.model.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutDTO {
    @JsonProperty("auth0id")
    String auth0Id;
    
    @JsonProperty("email")
    String email;
    
    @JsonProperty("plan")
    String plan;
}
