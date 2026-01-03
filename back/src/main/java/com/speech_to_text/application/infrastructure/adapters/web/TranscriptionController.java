package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.speech_to_text.application.domain.model.DTO.TranscribeSettingsDTO;
import com.speech_to_text.application.domain.port.in.MediaFileUseCase;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/transcription")
@AllArgsConstructor
public class TranscriptionController {

    TranscriptionUseCase transcriptionUseCase;
    MediaFileUseCase mediaFileUseCase;

    @PostMapping(value="/longfile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> transcribeLongFile(@RequestPart("file") MultipartFile file, @RequestPart("metadata") TranscribeSettingsDTO settings)
    {
        Map<String, String> res = new HashMap<>();
        if (file.isEmpty()) {
            res.put("error", "File uploaded null, try again.");
            return ResponseEntity.status(401).body(res);
        }

        // System.out.println("vohantso le transcribe long file");
        // settings.toString();
        
        try {
            String transcription  = transcriptionUseCase.transcribeLongFile(file, settings);
            return ResponseEntity.ok(transcription);
        }
        catch (Exception e) {
            e.printStackTrace();
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }

    
    @PostMapping(value="/shortfile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> transcribeShortFile(@RequestPart("file") MultipartFile file, @RequestPart("metadata") TranscribeSettingsDTO settings)
    {
        Map<String, String> res = new HashMap<>();
        if (file.isEmpty()) {
            res.put("error", "File uploaded null, try again.");
            return ResponseEntity.status(401).body(res);
        }

        // System.out.println("vohantso le transcribe short file");
        // settings.toString();
        
        try {
            String transcription  = transcriptionUseCase.transcribeShortFile(file, settings);
            return ResponseEntity.ok(transcription);
        }
        catch (Exception e) {
            e.printStackTrace();
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }
}
    