package com.speech_to_text.application.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionType {
    String id;
    String name;
    List<String> description;
    double price;
    String frequency;
}
