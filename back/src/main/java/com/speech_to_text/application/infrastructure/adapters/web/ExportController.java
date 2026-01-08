package com.speech_to_text.application.infrastructure.adapters.web;

import java.io.ByteArrayOutputStream;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.in.ExportUseCase;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/export")
public class ExportController {
    
    private final ExportUseCase exportUseCase;
  
    @GetMapping("/")
    public ResponseEntity<?> findAll(@RequestBody String type, @RequestBody Transcription transcription) {
        ByteArrayOutputStream byteArray = new ByteArrayOutputStream();

        try {
            if ("pdf".equalsIgnoreCase(type)) {
                byteArray = exportUseCase.generatePdf(transcription);
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=rapport.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(byteArray.toByteArray());
            }
            else if ("docx".equalsIgnoreCase(type)) {
                byteArray = exportUseCase.generateDocx(transcription);
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=rapport.docx")
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
                    .body(byteArray.toByteArray());
            }
            else if ("txt".equalsIgnoreCase(type)) {
                byteArray = exportUseCase.generateTxt(transcription);
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=rapport.txt")
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(byteArray.toByteArray());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();   
        }
        
        return ResponseEntity.badRequest().build();   
    }
}
