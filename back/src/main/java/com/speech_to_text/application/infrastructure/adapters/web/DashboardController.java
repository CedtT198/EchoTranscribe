package com.speech_to_text.application.infrastructure.adapters.web;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.port.in.SubscriptionUseCase;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;
import com.speech_to_text.application.domain.port.in.UserUseCase;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    
    private final TranscriptionUseCase transcriptionUseCase;
    private final SubscriptionUseCase subscriptionUseCase;
    private final UserUseCase userUseCase;

    @GetMapping("/getUsersStat")
    public ResponseEntity<?> getUsersStat(@RequestParam(required = false) LocalDate startDate, @RequestParam(required = false) LocalDate endDate) {
        Map<String, String> res = new HashMap<>();

        ResponseEntity<?> errors = getDateError(res, startDate, endDate);
        if (errors != null) {
            return errors;
        }

        try {
            return ResponseEntity.status(200).body(userUseCase.getUsersDashboardStat(startDate, endDate));   
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);   
        }
    }

    
    @GetMapping("/getSalesStat")
    public ResponseEntity<?> getSalesStat(@RequestParam(required = false) LocalDate startDate, @RequestParam(required = false) LocalDate endDate) {
        Map<String, String> res = new HashMap<>();

        ResponseEntity<?> errors = getDateError(res, startDate, endDate);
        if (errors != null) {
            return errors;
        }

        try {
            return ResponseEntity.status(200).body(subscriptionUseCase.getSalesDashboardStat(startDate, endDate));   
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);   
        }
    }

    
    @GetMapping("/getPerformanceStat")
    public ResponseEntity<?> getPerformanceStat(@RequestParam(required = false) LocalDate startDate, @RequestParam(required = false) LocalDate endDate) {
        Map<String, String> res = new HashMap<>();

        ResponseEntity<?> errors = getDateError(res, startDate, endDate);
        if (errors != null) {
            return errors;
        }

        try {
            return ResponseEntity.status(200).body(transcriptionUseCase.getPerfDashboardStat(startDate, endDate));   
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);   
        }
    }

    private ResponseEntity<?> getDateError(Map<String, String> res, LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            res.put("error", "Start date and End date must be set.");
            return ResponseEntity.status(401).body(res);
        }

        if (startDate.isAfter(endDate)) {
            res.put("error", "Start date cannot be after End date.");
            return ResponseEntity.status(401).body(res);
        }

        return null;
    }
}
