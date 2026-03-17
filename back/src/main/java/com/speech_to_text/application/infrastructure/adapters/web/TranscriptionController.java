package com.speech_to_text.application.infrastructure.adapters.web;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @PostMapping("/findByFilters")
    public ResponseEntity<?> findByFilters(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "createdDate,desc") String sort,
        @RequestBody TranscriptionFilterDto filter)
    {
        Sort.Direction direction = Sort.Direction.fromString(sort.split(",")[1]);
        String sortProperty = sort.split(",")[0];
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortProperty));
        
        // if (filter.getContentPhrase() != null) {
        //     filter.setContentPhrase(filter.getContentPhrase().trim().isEmpty() ? null : filter.getContentPhrase().trim());
        // }
        // if (filter.getSummaryPhrase() != null) {
        //     filter.setSummaryPhrase(filter.getSummaryPhrase().trim().isEmpty() ? null : filter.getSummaryPhrase().trim());
        // }

        Page<Transcription> transcriptionPage = transcriptionUseCase.findByFilters(filter, pageable);

        // Conversion en DTO si nécessaire
        // Page<TranscriptionDto> dtoPage = transcriptionPage.map(this::convertToDto);
        return ResponseEntity.ok(transcriptionPage);
    }


    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(transcriptionUseCase.findAll());
    }


    @GetMapping("/findAllById")
    public ResponseEntity<?> findAllByAuth0Id(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "createdDate,desc") String sort,
        @RequestParam String auth0Id)
    {
        Sort.Direction direction = Sort.Direction.fromString(sort.split(",")[1]);
        String sortProperty = sort.split(",")[0];
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortProperty));

        // Appel du service
        Page<Transcription> transcriptionPage = transcriptionUseCase.findAllByAuth0Id(auth0Id, pageable);

        // Conversion en DTO si nécessaire
        // Page<TranscriptionDto> dtoPage = transcriptionPage.map(this::convertToDto);
        return ResponseEntity.ok(transcriptionPage);
    }
    

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        System.err.println("delete vohantso");
        return ResponseEntity.ok(transcriptionUseCase.delete(id));
    }


    // @PostMapping("/update")
    // public ResponseEntity<?> update(@RequestBody Transcription transcription) {
    //     return ResponseEntity.ok(transcriptionUseCase.update(transcription));
    // }


    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Transcription transcription) {
        Map<String, String> res = new HashMap<>();

        try {            
            transcriptionUseCase.save(transcription);
            res.put("success", "Transcription "+transcription.getTitle()+" saved successfuly. Check \"History\" for more details.");
            return ResponseEntity.ok().body(res);
        }
        catch (Exception e) {
            res.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(res);
        }
    }


    @GetMapping("/longfile/status/{taskId}")
    public ResponseEntity<?> getStatus(@PathVariable String taskId) {
        // System.out.println("STATUS");

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

            Path tempFile = Files.createTempFile("upload_", "." + FilenameUtils.getExtension(file.getOriginalFilename()));
            Files.copy(file.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);

            transcriptionUseCase.transcribeLongFileAsync(tempFile, file.getOriginalFilename(), settings, taskId);

            Map<String, String> response = new HashMap<>();
            response.put("taskId", taskId);
            response.put("success", "Transcription started successfuly");

            return ResponseEntity.ok(response);
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
            String transcription  = transcriptionUseCase.transcribeShortFile(file, settings);
            return ResponseEntity.ok(transcription);
            // return ResponseEntity.ok("OK");
        }
        catch (Exception e) {
            e.printStackTrace();
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }
}
    