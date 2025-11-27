package com.speech_to_text.application.domain.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transcribing {
    public String id;
    public String date_transcribing;
    public String type_transcribing;
    public String file;
    public String user;
}