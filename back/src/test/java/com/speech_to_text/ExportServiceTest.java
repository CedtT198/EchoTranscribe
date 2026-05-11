package com.speech_to_text;

import static org.junit.jupiter.api.Assertions.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.service.withDependance.ExportService;

class ExportServiceTest {

    private ExportService exportService;

    @BeforeEach
    void setUp() {
        exportService = new ExportService();
    }

    private Transcription buildTranscription() {
        Transcription transcription = new Transcription();

        transcription.setTitle("Test Title");
        transcription.setSubtitle("Test Subtitle");
        transcription.setLanguage("FR");
        transcription.setTranscriptionType("FULL");
        transcription.setFile("audio.mp3");
        transcription.setFileDuration(5.0);
        transcription.setCreationDate(LocalDate.now());
        transcription.setGoal("bullet_points");
        transcription.setLength("short");
        transcription.setAdditionalInstruction("No additional instructions");
        transcription.setContent("This is a transcription content.");
        transcription.setSummary("This is a summary.");
        transcription.setAuth0Id("user@test.com");

        return transcription;
    }

    @Test
    void shouldGeneratePdfSuccessfully() throws Exception {
        Transcription transcription = buildTranscription();

        ByteArrayOutputStream result = exportService.generatePdf(transcription, "user@test.com");

        assertNotNull(result);
        assertTrue(result.size() > 0);
    }
    
    @Test
    void shouldGeneratePdfWithoutSubtitle() throws Exception {
        Transcription transcription = buildTranscription();
        transcription.setSubtitle(null);

        ByteArrayOutputStream result = exportService.generatePdf(transcription, "user@test.com");

        assertNotNull(result);
        assertTrue(result.size() > 0);
    }

    @Test
    void shouldGenerateDocxSuccessfully() throws Exception {
        Transcription transcription = buildTranscription();

        ByteArrayOutputStream result = exportService.generateDocx(transcription, "user@test.com");

        assertNotNull(result);
        assertTrue(result.size() > 0);

        // Vérifie que le DOCX est lisible
        XWPFDocument document = new XWPFDocument(new ByteArrayInputStream(result.toByteArray()));

        assertNotNull(document);
        assertFalse(document.getParagraphs().isEmpty());

        document.close();
    }

    @Test
    void shouldGenerateTxtSuccessfully() throws Exception {
        Transcription transcription = buildTranscription();

        ByteArrayOutputStream result = exportService.generateTxt(transcription, "user@test.com");

        assertNotNull(result);
        assertTrue(result.size() > 0);

        String content = result.toString();

        assertTrue(content.contains("ECHOTRANSCRIBE"));
        assertTrue(content.contains("This is a transcription content."));
        assertTrue(content.contains("This is a summary."));
    }

    @Test
    void shouldHandleNullSummaryInTxt() throws Exception {
        Transcription transcription = buildTranscription();
        transcription.setSummary(null);

        ByteArrayOutputStream result = exportService.generateTxt(transcription, "user@test.com");
        assertNotNull(result);

        String content = result.toString();
        assertTrue(content.contains("Summary"));
    }
}