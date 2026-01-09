package com.speech_to_text.application.domain.model.others;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    String id;
    String auth0Id;
    String name;
    String firstName;
    LocalDate creationDate;
    String review;
    double stars;
}
