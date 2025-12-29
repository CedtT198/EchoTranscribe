package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "qa")
public class QADocument {
    @Id
    String id;

    String about;
    String question;
    String answer;
}
