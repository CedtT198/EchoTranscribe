package com.speech_to_text.application.domain.service.independant;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class TaskStatus {
    private static final Map<String, String> results = new ConcurrentHashMap<>();
    private static final Map<String, String> statuses = new ConcurrentHashMap<>();
    private static final Map<String, Integer> progresses = new ConcurrentHashMap<>();
    private static final Map<String, String> errors = new ConcurrentHashMap<>();

    public static void init(String taskId) {
        statuses.put(taskId, "PENDING");
        progresses.put(taskId, 0);
    }

    public static void setResult(String taskId, String result) {
        results.put(taskId, result);
    }

    public static void setStatus(String taskId, String status) {
        statuses.put(taskId, status);
    }

    public static void setProgress(String taskId, int progress) {
        if (progress > 90 && !getStatus(taskId).equals("COMPLETED")) {
            progress = 90;
            setStatus(taskId, "Almost there...");
        }
        progresses.put(taskId, progress);
    }

    public static void setError(String taskId, String error) {
        errors.put(taskId, error);
        statuses.put(taskId, "ERROR");
    }
    
    public static void cleanup(String taskId) {
        results.remove(taskId);
        statuses.remove(taskId);
        progresses.remove(taskId);
        errors.remove(taskId);
    }


    public static String getResult(String taskId) {
        return results.get(taskId);
    }
    public static String getStatus(String taskId) {
        return statuses.getOrDefault(taskId, "UNKNOWN");
    }
    public static int getProgress(String taskId) {
        return progresses.getOrDefault(taskId, 0);
    }
    public static String getError(String taskId) {
        return errors.get(taskId);
    }
}