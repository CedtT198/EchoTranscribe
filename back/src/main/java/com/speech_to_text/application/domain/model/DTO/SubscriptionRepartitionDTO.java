package com.speech_to_text.application.domain.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionRepartitionDTO {
    String subscription;
    Double value;
}
