package com.speech_to_text;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.speech_to_text.application.domain.model.config.GoogleCloud;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.in.MediaFileUseCase;
import com.speech_to_text.application.domain.port.in.SubscriptionUseCase;
import com.speech_to_text.application.domain.port.out.TranscriptionRepository;
import com.speech_to_text.application.domain.port.out.TranscriptionSettingsRepository;
import com.speech_to_text.application.domain.service.withDependance.TranscriptionService;

class TranscriptionServiceTest {

    private GoogleCloud gcloud;
    private MediaFileUseCase mediaFileUseCase;
    private SubscriptionUseCase subUseCase;
    private TranscriptionSettingsRepository repo;
    private TranscriptionRepository transcriptionRepo;
    private TranscriptionService transcriptionService;

    @BeforeEach
    void setUp() {
        gcloud = mock(GoogleCloud.class);
        mediaFileUseCase  = mock(MediaFileUseCase.class);
        subUseCase = mock(SubscriptionUseCase.class);
        repo = mock(TranscriptionSettingsRepository.class);
        transcriptionRepo = mock(TranscriptionRepository.class);

        transcriptionService = new TranscriptionService(gcloud, mediaFileUseCase, subUseCase, repo, transcriptionRepo);
    }

    @Test
    void shouldSaveTranscriptionSuccessfully() throws Exception {

        Transcription tr = new Transcription();

        tr.setTitle("Meeting");
        tr.setContent("Meeting transcription content");
        tr.setSummary("Summary");

        when(transcriptionRepo.save(any(Transcription.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Transcription result = transcriptionService.save(tr);

        assertNotNull(result);
        assertEquals("Meeting", result.getTitle());
        assertNotNull(result.getCreationDate());

        verify(transcriptionRepo, times(1)).save(tr);
    }

    @Test
    void shouldSetCreationDateWhenNull() throws Exception {

        Transcription tr = new Transcription();

        tr.setTitle("Title");
        tr.setContent("Content");
        tr.setSummary("Summary");
        tr.setCreationDate(null);

        when(transcriptionRepo.save(any(Transcription.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Transcription result = transcriptionService.save(tr);
        assertEquals(LocalDate.now(), result.getCreationDate());
    }

    @Test
    void shouldThrowExceptionWhenTitleIsEmpty() {

        Transcription tr = new Transcription();

        tr.setTitle("");
        tr.setContent("Content");
        tr.setSummary("Summary");

        Exception exception = assertThrows(Exception.class, () ->transcriptionService.save(tr));

        assertEquals("Title and content must be set.", exception.getMessage());
        verify(transcriptionRepo, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenContentAndSummaryAreEmpty() {

        Transcription tr = new Transcription();

        tr.setTitle("Title");
        tr.setContent("");
        tr.setSummary("");

        Exception exception = assertThrows(Exception.class, () ->transcriptionService.save(tr));

        assertEquals("Title and content must be set.", exception.getMessage());
        verify(transcriptionRepo, never()).save(any());
    }
}