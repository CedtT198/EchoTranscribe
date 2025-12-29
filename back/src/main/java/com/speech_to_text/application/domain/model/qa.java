package com.speech_to_text.application.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QA {
    String about;
    String question;
    String answer;
}
