package com.speech_to_text.application.infrastructure.adapters.web;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.speech_to_text.application.domain.model.DTO.TranscriptionFilterDto;
import com.speech_to_text.application.domain.model.DTO.TranscriptionSettings;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;
import com.speech_to_text.application.domain.service.independant.TaskStatus;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/transcription")
@AllArgsConstructor
public class TranscriptionController {

    private final TranscriptionUseCase transcriptionUseCase;

    @GetMapping("/findByFilters")
    public ResponseEntity<?> findByFilters(@RequestBody TranscriptionFilterDto filter) {
        return ResponseEntity.ok(transcriptionUseCase.findByFilters(filter));
    }


    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(transcriptionUseCase.findAll());
    }


    @GetMapping("/findByAuth0Id/{auth0Id}")
    public ResponseEntity<?> findByAuth0Id(@PathVariable String auth0Id) {
        return ResponseEntity.ok(transcriptionUseCase.findAllByAuth0Id(auth0Id));
    }
    

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        System.err.println("delete vohantso");
        return ResponseEntity.ok(transcriptionUseCase.delete(auth0Id));
    }


    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody Transcription transcription) {
        return ResponseEntity.ok(transcriptionUseCase.update(transcription));
    }


    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Transcription transcription) {
        Map<String, String> res = new HashMap<>();

        transcriptionUseCase.save(transcription);
        
        res.put("success", "Transcription saved.");
        return ResponseEntity.status(200).body(res);
    }


    @GetMapping("/longfile/status/{taskId}")
    public ResponseEntity<?> getStatus(@PathVariable String taskId) {
        System.out.println("STATUS");

        String status = TaskStatus.getStatus(taskId);
        int progress = TaskStatus.getProgress(taskId);

        Map<String, Object> resp = new HashMap<>();
        resp.put("status", status);
        resp.put("progress", progress);

        if ("COMPLETED".equals(status)) {
            resp.put("transcript", TaskStatus.getResult(taskId));
            TaskStatus.cleanup(taskId);
        }
        else if ("ERROR".equals(status)) {
            resp.put("error", TaskStatus.getError(taskId));
        }

        return ResponseEntity.ok(resp);
    }

    

    @PostMapping(value="/longfile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> transcribeLongFile(@RequestPart("file") MultipartFile file, @RequestPart("metadata") TranscriptionSettings settings)
    {
        System.out.println("LONG, file: "+file.getOriginalFilename());
        settings.toString();

        Map<String, String> res = new HashMap<>();

        if (file.isEmpty()) {
            res.put("error", "File uploaded null, try again.");
            return ResponseEntity.status(401).body(res);
        }
        
        try {
            String taskId = UUID.randomUUID().toString();
            TaskStatus.init(taskId);

            // transcriptionUseCase.transcribeLongFileAsync(file, settings, taskId);

            Map<String, String> response = new HashMap<>();
            response.put("taskId", taskId);
            response.put("success", "Transcription started successfuly");

            return ResponseEntity.ok(response);

        //     String transcription  = transcriptionUseCase.transcribeLongFile(file, settings);
        //     return ResponseEntity.ok(transcription);
        }
        catch (Exception e) {
            e.printStackTrace();
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }


    
    @PostMapping(value="/shortfile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> transcribeShortFile(@RequestPart("file") MultipartFile file, @RequestPart("metadata") TranscriptionSettings settings)
    {
        System.out.println("SHORT, file: "+file.getOriginalFilename());
        settings.toString();

        Map<String, String> res = new HashMap<>();
        if (file.isEmpty()) {
            res.put("error", "File uploaded null, try again.");
            return ResponseEntity.status(401).body(res);
        }
        
        try {
            // String transcription  = transcriptionUseCase.transcribeShortFile(file, settings);
            // return ResponseEntity.ok(transcription);
            return ResponseEntity.ok("OK");
        }
        catch (Exception e) {
            e.printStackTrace();
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }
}
    