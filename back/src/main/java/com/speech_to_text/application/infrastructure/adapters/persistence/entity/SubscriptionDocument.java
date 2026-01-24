package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "subscription")
public class SubscriptionDocument {
    @Id
    String id;
    
    String auth0Id;
    String mail;
    String subscriptionType;
    String status; // ACTIVE | CANCEL_AT_PERIOD_END | CANCELED
    LocalDate purchaseDate;
    LocalDate endDate;
    String invitationCode;
    String subscriptionOwner;
    Double price; 
}

