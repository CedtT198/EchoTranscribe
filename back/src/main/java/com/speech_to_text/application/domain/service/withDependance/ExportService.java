package com.speech_to_text.application.domain.service.withDependance;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.openpdf.text.Document;
import org.openpdf.text.Paragraph;
import org.openpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;
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
        ByteArrayOutputStream byteArray = new ByteArrayOutputStream();
        
        WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.createPackage();
        wordMLPackage.getMainDocumentPart().addParagraphOfText("Contenu dynamique");
        wordMLPackage.save(byteArray);

        return byteArray;
    }

    @Override
    public ByteArrayOutputStream generateTxt(Transcription transcription) throws Exception {
        ByteArrayOutputStream byteArray = new ByteArrayOutputStream();

        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(byteArray, StandardCharsets.UTF_8))) {
            String date = (transcription.getCreationDate() != null) ? transcription.getCreationDate() : LocalDate.now().toString();

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
