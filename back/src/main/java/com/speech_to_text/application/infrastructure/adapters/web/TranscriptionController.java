package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
class TranscribeRequest {
    @JsonProperty("minPeople")
    Integer minPeople;
    
    @JsonProperty("maxPeople")
    Integer maxPeople;

    @JsonProperty("languages")
    List<String> languages;

    @JsonProperty("diarization")
    Boolean diarization;
}

@Controller
@RequestMapping("/transcription")
@AllArgsConstructor
public class TranscriptionController {
    @PostMapping(value="/batch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> transcribeFile(@RequestPart("file") MultipartFile file, @RequestPart("metadata") TranscribeRequest tr) {
        // System.out.println("vohantso le transcribe file");
        return ResponseEntity.ok("Damn");
    }
}
    