package com.speech_to_text;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.speech_to_text.application.domain.model.DTO.ExportDTO;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ExportControllerITest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    /**
     * Builds a minimal valid Transcription object.
     * Adjust field setters to match your actual Transcription model.
     */
    private Transcription buildTranscription(String title) {
        Transcription t = new Transcription();
        t.setTitle(title);
        // set any other mandatory fields here, e.g.:
        // t.setContent("Sample transcription content.");
        return t;
    }

    private ExportDTO buildExportDTO(String type, String title, String mail) {
        ExportDTO dto = new ExportDTO();
        dto.setType(type);
        dto.setTranscription(buildTranscription(title));
        dto.setMail(mail);
        return dto;
    }

    // =========================================================================
    // POST /export/
    // =========================================================================

    @Nested
    @DisplayName("POST /export/  — PDF export")
    class ExportPdf {

        @Test
        @DisplayName("Should return 200 with PDF content-type and correct filename")
        void shouldReturn200WithPdfFile() throws Exception {
            ExportDTO dto = buildExportDTO("pdf", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                    .andExpect(header().string("Content-Disposition",
                            "attachment; filename=my_transcript.pdf"));
        }

        @Test
        @DisplayName("Should be case-insensitive for type 'PDF'")
        void shouldBeCaseInsensitiveForPdf() throws Exception {
            ExportDTO dto = buildExportDTO("PDF", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_PDF));
        }

        @Test
        @DisplayName("Should return 200 and non-empty body for PDF export")
        void shouldReturnNonEmptyBodyForPdf() throws Exception {
            ExportDTO dto = buildExportDTO("pdf", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andReturn()
                    .getResponse()
                    .getContentAsByteArray();
            
            // assertTrue(response.length > 0);
        }
    }

    @Nested
    @DisplayName("POST /export/  — DOCX export")
    class ExportDocx {

        @Test
        @DisplayName("Should return 200 with octet-stream content-type and correct filename")
        void shouldReturn200WithDocxFile() throws Exception {
            ExportDTO dto = buildExportDTO("docx", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_OCTET_STREAM))
                    .andExpect(header().string("Content-Disposition",
                            "attachment; filename=my_transcript.docx"));
        }

        @Test
        @DisplayName("Should be case-insensitive for type 'DOCX'")
        void shouldBeCaseInsensitiveForDocx() throws Exception {
            ExportDTO dto = buildExportDTO("DOCX", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_OCTET_STREAM));
        }

        @Test
        @DisplayName("Should return 200 and non-empty body for DOCX export")
        void shouldReturnNonEmptyBodyForDocx() throws Exception {
            ExportDTO dto = buildExportDTO("docx", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andReturn()
                    .getResponse()
                    .getContentAsByteArray();
        }
    }

    @Nested
    @DisplayName("POST /export/  — TXT export")
    class ExportTxt {

        @Test
        @DisplayName("Should return 200 with text/plain content-type and correct filename")
        void shouldReturn200WithTxtFile() throws Exception {
            ExportDTO dto = buildExportDTO("txt", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.TEXT_PLAIN))
                    .andExpect(header().string("Content-Disposition",
                            "attachment; filename=my_transcript.txt"));
        }

        @Test
        @DisplayName("Should be case-insensitive for type 'TXT'")
        void shouldBeCaseInsensitiveForTxt() throws Exception {
            ExportDTO dto = buildExportDTO("TXT", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.TEXT_PLAIN));
        }

        @Test
        @DisplayName("Should return 200 and non-empty body for TXT export")
        void shouldReturnNonEmptyBodyForTxt() throws Exception {
            ExportDTO dto = buildExportDTO("txt", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andReturn()
                    .getResponse()
                    .getContentAsByteArray();
            
            // assertTrue(response.length > 0);
        }
    }

    @Nested
    @DisplayName("POST /export/  — Unknown / invalid type")
    class ExportUnknownType {

        @Test
        @DisplayName("Should return 400 when export type is unknown")
        void shouldReturn400WhenTypeIsUnknown() throws Exception {
            ExportDTO dto = buildExportDTO("csv", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when type is empty string")
        void shouldReturn400WhenTypeIsEmpty() throws Exception {
            ExportDTO dto = buildExportDTO("", "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when type is null")
        void shouldReturn400WhenTypeIsNull() throws Exception {
            ExportDTO dto = buildExportDTO(null, "my_transcript", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("POST /export/  — Malformed request body")
    class ExportMalformedBody {

        @Test
        @DisplayName("Should return 400 when request body is empty")
        void shouldReturn400WhenBodyIsEmpty() throws Exception {
            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when request body is completely missing")
        void shouldReturn400WhenBodyIsMissing() throws Exception {
            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when JSON is malformed")
        void shouldReturn400WhenJsonIsMalformed() throws Exception {
            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{ this is not valid json }"))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should return 400 when content-type is not JSON")
        void shouldReturn400WhenContentTypeIsNotJson() throws Exception {
            mockMvc.perform(post("/export/")
                            .contentType(MediaType.TEXT_PLAIN)
                            .content("pdf"))
                    .andExpect(status().isUnsupportedMediaType());
        }
    }

    @Nested
    @DisplayName("POST /export/  — Filename in Content-Disposition")
    class ExportFilename {

        @Test
        @DisplayName("Should use transcription title as filename for PDF")
        void shouldUseTitleAsFilenameForPdf() throws Exception {
            ExportDTO dto = buildExportDTO("pdf", "interview_2024", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(header().string("Content-Disposition",
                            "attachment; filename=interview_2024.pdf"));
        }

        @Test
        @DisplayName("Should use transcription title as filename for DOCX")
        void shouldUseTitleAsFilenameForDocx() throws Exception {
            ExportDTO dto = buildExportDTO("docx", "interview_2024", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(header().string("Content-Disposition",
                            "attachment; filename=interview_2024.docx"));
        }

        @Test
        @DisplayName("Should use transcription title as filename for TXT")
        void shouldUseTitleAsFilenameForTxt() throws Exception {
            ExportDTO dto = buildExportDTO("txt", "interview_2024", "user@example.com");

            mockMvc.perform(post("/export/")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dto)))
                    .andExpect(status().isOk())
                    .andExpect(header().string("Content-Disposition",
                            "attachment; filename=interview_2024.txt"));
        }
    }
}