package com.speech_to_text.application.domain.model.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvitationCodeDTO {
    
    @JsonProperty("auth0id")
    String auth0id;

    @JsonProperty("mail")
    String mail;
    
    @JsonProperty("code")
    String code;
}
