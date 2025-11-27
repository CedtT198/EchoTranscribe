package com.speech_to_text.application.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionType {
    String id;
    String name;
    String description;
    double price;
    String frequency;
}
