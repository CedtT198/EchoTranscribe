package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "subscription_type")
public class SubscriptionTypeDocument {
    @Id
    String id;

    String name;
    List<String> description;
    double price;
    String frequency;
}
