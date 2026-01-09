package com.speech_to_text.application.domain.service.withDependance;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.stereotype.Service;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.in.ExportUseCase;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ExportService implements ExportUseCase {

    @Override
    public ByteArrayOutputStream generatePdf(Transcription transcription) throws Exception {
        ByteArrayOutputStream byteArray = new ByteArrayOutputStream();

        Document document = new Document();
        PdfWriter.getInstance(document, byteArray);
        document.open();
        document.add(new Paragraph("Contenu dynamique"));
        document.close();

        return byteArray;
    }

    @Override
    public ByteArrayOutputStream generateDocx(Transcription transcription) throws Exception {
        XWPFDocument document = new XWPFDocument();

        // Titre
        XWPFParagraph title = document.createParagraph();
        title.setAlignment(ParagraphAlignment.CENTER);

        XWPFRun titleRun = title.createRun();
        titleRun.setText("Export DOCX avec Spring Boot");
        titleRun.setBold(true);
        titleRun.setFontSize(18);

        // Contenu
        XWPFParagraph paragraph = document.createParagraph();
        XWPFRun run = paragraph.createRun();
        run.setText("Ceci est un exemple de fichier Word généré en Java.");
        run.setFontSize(12);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        document.write(outputStream);
        document.close();

        return outputStream;
    }

    @Override
    public ByteArrayOutputStream generateTxt(Transcription transcription) throws Exception {
        ByteArrayOutputStream byteArray = new ByteArrayOutputStream();

        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(byteArray, StandardCharsets.UTF_8))) {
            String date = (transcription.getCreationDate() != null) ? transcription.getCreationDate().toString() : LocalDate.now().toString();

            writer.write("Rapport généré le : " + date);
            writer.newLine();
            writer.write("Filename : " + transcription.getFile());
            writer.newLine();
            writer.write("subtitle : " + transcription.getSubtitle());
            writer.newLine();
            writer.newLine();
            // writer.write("Liste des items :");
            // writer.newLine();
            // for (String item : transcription.getItems()) {
            //     writer.write("- " + item);
            //     writer.newLine();
            // }
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }

        return byteArray;
    }
}
