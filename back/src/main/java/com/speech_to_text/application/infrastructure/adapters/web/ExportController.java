package com.speech_to_text.application.infrastructure.adapters.web;

import java.io.ByteArrayOutputStream;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.DTO.ExportDTO;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.in.ExportUseCase;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/export")
public class ExportController {
    
    private final ExportUseCase exportUseCase;
  
    @PostMapping("/")
    public ResponseEntity<?> export(@RequestBody ExportDTO exportDto) {
        String type = exportDto.getType();
        Transcription transcription = exportDto.getTranscription();

        ByteArrayOutputStream byteArray = new ByteArrayOutputStream();

        System.out.println("EXPORT..."); 
        System.out.println(type);
        System.out.println(transcription);

        try {
            if ("pdf".equalsIgnoreCase(type)) {
                byteArray = exportUseCase.generatePdf(transcription);
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+exportDto.getTranscription().getFile()+".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(byteArray.toByteArray());
            }
            else if ("docx".equalsIgnoreCase(type)) {
                byteArray = exportUseCase.generateDocx(transcription);
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+exportDto.getTranscription().getFile()+".docx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(byteArray.toByteArray());
            }
            else if ("txt".equalsIgnoreCase(type)) {
                byteArray = exportUseCase.generateTxt(transcription);
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+exportDto.getTranscription().getFile()+".txt")
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(byteArray.toByteArray());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();   
        }
        
        return ResponseEntity.badRequest().build();   
    }
}
