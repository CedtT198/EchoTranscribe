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
@Document(collection = "review")
public class ReviewDocument {
    @Id
    String id;

    String auth0Id;
    String name;
    String firstName;
    LocalDate creationDate;
    String review;
    Double stars;
}

