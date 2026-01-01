package com.speech_to_text.application.infrastructure.adapters.web;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.speech_to_text.application.domain.model.DTO.TranscribeDTO;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/transcription")
@AllArgsConstructor
public class TranscriptionController {

    TranscriptionUseCase transcriptionUseCase;

    @PostMapping(value="/batch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> transcribeFile(@RequestPart("file") MultipartFile file, @RequestPart("metadata") TranscribeDTO tr) {
        System.out.println("vohantso le transcribe file");
        // System.out.println(file.getOriginalFilename());
        // System.out.println(tr.getMinPeople());
        // System.out.println(tr.getMaxPeople());
        // System.out.println(tr.getDiarization());
        // System.out.println(tr.getLanguages());
        return ResponseEntity.ok(transcriptionUseCase.transcribe(file, tr));
    }
}
    