package com.speech_to_text.application.domain.model.subscription;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {
    String id;

    String auth0Id;
    String mail;
    String subscriptionType;
    String status;
    LocalDate purchaseDate;
    LocalDate endDate;
    String invitationCode;
    String subscriptionOwner;
    Double price;  
}