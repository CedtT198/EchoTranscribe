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
    LocalDate start_date;   
    LocalDate end_date;   
    String subscription_type;
    String user;   
}