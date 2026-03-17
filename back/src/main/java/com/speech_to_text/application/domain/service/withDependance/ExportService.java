package com.speech_to_text.application.domain.service.withDependance;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import org.apache.poi.util.Units;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;
import org.springframework.stereotype.Service;
import com.lowagie.text.*;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.speech_to_text.application.domain.model.transcription.Transcription;
import com.speech_to_text.application.domain.port.in.ExportUseCase;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class ExportService implements ExportUseCase {

    @Override
    public ByteArrayOutputStream generatePdf(Transcription transcription, String mail) throws Exception { 
        BaseFont baseRegular = BaseFont.createFont("fonts/TiltNeon-Regular.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Document document = new Document(PageSize.A4, 50, 50, 50, 50);
        PdfWriter.getInstance(document, outputStream);
        document.open();

        // Fonts
        Font titleFont = new Font(baseRegular, 20, Font.BOLD);
        Font subtitleFont = new Font(baseRegular, 14, Font.ITALIC);
        Font sectionFont = new Font(baseRegular, 12, Font.BOLD);
        Font labelFont = new Font(baseRegular, 9, Font.BOLD);
        Font valueFont = new Font(baseRegular, 9);
        Font contentFont = new Font(baseRegular, 10);
        //

        // Title
        Image logo = Image.getInstance(
            Objects.requireNonNull(
                getClass().getClassLoader().getResource("images/logo_white_resized.png")
            )
        );

        logo.scaleToFit(100, 60);
        logo.setAlignment(Image.ALIGN_CENTER);
        // logo.setSpacingAfter(10);
        document.add(logo);

        Paragraph title = new Paragraph(transcription.getTitle(), titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(10);
        document.add(title);

        if (transcription.getSubtitle() != null && !transcription.getSubtitle().isBlank()) {
            Paragraph subtitle = new Paragraph(transcription.getSubtitle(), subtitleFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingAfter(10);
            document.add(subtitle);
        }
        //

        PdfPTable optionsTable = new PdfPTable(2);
        optionsTable.setWidthPercentage(100);
        optionsTable.setSpacingBefore(15);
        optionsTable.setWidths(new float[]{1, 1});


        // Transcription options
        PdfPTable transOptions = new PdfPTable(2);
        transOptions.setWidthPercentage(100);
        transOptions.setWidths(new float[]{3, 7});

        PdfPCell leftHeader = new PdfPCell(new Paragraph("Transcription options", sectionFont));
        leftHeader.setBorder(Rectangle.NO_BORDER);
        leftHeader.setPaddingBottom(5);
        leftHeader.setColspan(2);
        transOptions.addCell(leftHeader);

        addRow(transOptions, "Language : ", transcription.getLanguage(), labelFont, valueFont);
        addRow(transOptions, "Type : ", transcription.getTranscriptionType(), labelFont, valueFont);
        addRow(transOptions, "Source file : ", transcription.getFile(), labelFont, valueFont);
        addRow(transOptions, "Duration : ", transcription.getFileDuration() != null ? transcription.getFileDuration().toString() : "No file", labelFont, valueFont);
        addRow(transOptions, "LocalDate : ", transcription.getCreationDate() != null ? transcription.getCreationDate().toString(): LocalDate.now().toString(),labelFont, valueFont);
        addRow(transOptions, "By : ", mail, labelFont, valueFont);
        // document.add(transOptions);
        
        //

        // Summary options
        PdfPTable summaryOptions = new PdfPTable(2);
        if (transcription.getSummary() != null && !transcription.getSummary().isBlank()) {
            PdfPCell rightHeader = new PdfPCell(new Paragraph("Summary options", sectionFont));
            rightHeader.setBorder(Rectangle.NO_BORDER);
            rightHeader.setPaddingBottom(5);
            rightHeader.setColspan(2);
            summaryOptions.addCell(rightHeader);

            summaryOptions.setWidthPercentage(100);
            summaryOptions.setWidths(new float[]{3, 7});

            addRow(summaryOptions, "Format : ", transcription.getGoal(), labelFont, valueFont);
            addRow(summaryOptions, "Length : ", transcription.getLength(), labelFont, valueFont);
            addRow(summaryOptions, "Additional instruction : ", transcription.getAdditionalInstruction(), labelFont, valueFont);
        }
        //

        PdfPCell leftCell = new PdfPCell(transOptions);
        leftCell.setBorder(Rectangle.NO_BORDER);
        leftCell.setPaddingRight(10);
        leftCell.setPaddingLeft(10);
        optionsTable.addCell(leftCell);

        if (transcription.getSummary() != null && !transcription.getSummary().isBlank()) {
            PdfPCell rightCell = new PdfPCell(summaryOptions);
            rightCell.setBorder(Rectangle.NO_BORDER);
            optionsTable.addCell(rightCell);
        }
        document.add(optionsTable);


        // Transcription content
        Paragraph contentTitle = new Paragraph("Transcription", sectionFont);
        contentTitle.setSpacingBefore(20);
        contentTitle.setSpacingAfter(5);
        document.add(contentTitle);

        Paragraph contentTrans = new Paragraph(transcription.getContent(), contentFont);
        contentTrans.setAlignment(Element.ALIGN_JUSTIFIED);
        contentTrans.setLeading(0, 1.6f);
        document.add(contentTrans);
        
        // Summary content
        if (transcription.getSummary() != null && !transcription.getSummary().isBlank()) {
            Paragraph summaryTitle = new Paragraph("Summary", sectionFont);
            summaryTitle.setSpacingBefore(20);
            summaryTitle.setSpacingAfter(10);
            document.add(summaryTitle);
        }

        Paragraph contentSum = new Paragraph(transcription.getContent(), contentFont);
        contentSum.setAlignment(Element.ALIGN_JUSTIFIED);
        contentSum.setLeading(0, 1.6f);
        document.add(contentSum);

        document.close();
        return outputStream;
    }

    private void addRow(PdfPTable table, String label, String value, Font labelFont, Font valueFont) {
        PdfPCell labelCell = new PdfPCell(new Paragraph(label, labelFont));
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setPadding(5);

        PdfPCell valueCell = new PdfPCell(new Paragraph(value != null ? value : "", valueFont));
        valueCell.setBorder(Rectangle.NO_BORDER);
        valueCell.setPadding(5);

        table.addCell(labelCell);
        table.addCell(valueCell);
    }


    @Override
    public ByteArrayOutputStream generateDocx(Transcription transcription, String mail) throws Exception {
        XWPFDocument document = new XWPFDocument();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        // Logo
        XWPFParagraph logoParagraph = document.createParagraph();
        logoParagraph.setAlignment(ParagraphAlignment.CENTER);

        XWPFRun logoRun = logoParagraph.createRun();
        try (InputStream logoStream =getClass().getClassLoader().getResourceAsStream("images/logo_white_resized.png")) {
            logoRun.addPicture(logoStream, org.apache.poi.xwpf.usermodel.Document.PICTURE_TYPE_PNG, "logo_white_resized.png", Units.toEMU(80), Units.toEMU(40));
        }
        logoRun.addBreak();
        //

        // TItre
        XWPFParagraph title = document.createParagraph();
        title.setAlignment(ParagraphAlignment.CENTER);

        XWPFRun titleRun = title.createRun();
        titleRun.setText(transcription.getFile());
        titleRun.setBold(true);
        titleRun.setFontSize(20);

        XWPFTable table = document.createTable(1, 2);
        table.getCTTbl().getTblPr().unsetTblBorders();
        table.setWidth("100%");

        XWPFTableCell leftCell = table.getRow(0).getCell(0);
        XWPFTableCell rightCell = table.getRow(0).getCell(1);

        addSectionTitle(leftCell, "Transcription options");
        addOption(leftCell, "Language", transcription.getLanguage());
        addOption(leftCell, "Type", transcription.getTranscriptionType());
        addOption(leftCell, "Source file", transcription.getFile());
        addOption(leftCell, "Duration", transcription.getFileDuration() != null ? transcription.getFileDuration().toString() : "No file");
        addOption(leftCell, "LocalDate", transcription.getCreationDate() != null ? transcription.getCreationDate().format(DateTimeFormatter.ISO_DATE) : LocalDate.now().toString());
        addOption(leftCell, "By", transcription.getAuth0Id());

        addSectionTitle(rightCell, "Summary options");
        addOption(rightCell, "Format", "bullet_points");
        addOption(rightCell, "Length", transcription.getLength());
        addOption(rightCell, "Additional instruction", transcription.getAdditionalInstruction());

        addTextSection(document, "Transcription", transcription.getContent());
        addTextSection(document, "Summary", transcription.getSummary());

        document.write(out);
        document.close();

        return out;
    }

    private void addTextSection(XWPFDocument doc, String title, String content) {

    XWPFParagraph titleP = doc.createParagraph();
    XWPFRun titleR = titleP.createRun();
    titleR.setText(title);
    titleR.setBold(true);
    titleR.setFontSize(14);

    XWPFParagraph contentP = doc.createParagraph();
    contentP.setAlignment(ParagraphAlignment.BOTH); // justifié
    contentP.setSpacingBetween(1.2);

    XWPFRun contentR = contentP.createRun();
    contentR.setText(content != null ? content : "");
    contentR.setFontSize(11);
}

    private void addOption(XWPFTableCell cell, String label, String value) {
        XWPFParagraph p = cell.addParagraph();
        XWPFRun r1 = p.createRun();
        r1.setText(label + " : ");
        r1.setBold(true);
        r1.setFontSize(10);

        XWPFRun r2 = p.createRun();
        r2.setText(value != null ? value : "");
        r2.setFontSize(10);
    }

    private void addSectionTitle(XWPFTableCell cell, String title) {
        XWPFParagraph p = cell.addParagraph();
        XWPFRun r = p.createRun();
        r.setText(title);
        r.setBold(true);
        r.setFontSize(12);
    }


    @Override
    public ByteArrayOutputStream generateTxt(Transcription transcription, String mail) throws Exception {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(new OutputStreamWriter(out, StandardCharsets.UTF_8));

        /* =====================
        HEADER
        ===================== */
        writer.println("ECHOTRANSCRIBE");
        writer.println("==============================================");
        writer.println();
        writer.println(transcription.getFile());
        writer.println();

        /* =====================
        OPTIONS (2 COLONNES)
        ===================== */
        writer.println("----------------------------------------------");
        writer.println(padRight("TRANSCRIPTION OPTIONS", 30)
                + "SUMMARY OPTIONS");
        writer.println("----------------------------------------------");

        writer.println(
                formatRow("Language", transcription.getLanguage(),
                        "Format", "bullet_points")
        );
        writer.println(
                formatRow("Type", transcription.getTranscriptionType(),
                        "Length", transcription.getLength())
        );
        writer.println(
                formatRow("Source", transcription.getFile(),
                        "Additional instruction", transcription.getAdditionalInstruction())
        );
        writer.println(
                formatRow("Duration", transcription.getFileDuration() != null ? transcription.getFileDuration().toString() : "No file",
                        "", "")
        );
        writer.println(
                formatRow("LocalDate",
                        transcription.getCreationDate() != null ? transcription.getCreationDate().toString() : LocalDate.now().toString(), "", "")
        );
        writer.println(
                formatRow("By", transcription.getAuth0Id(), "", "")
        );

        writer.println();
        writer.println("==============================================");

        /* =====================
        TRANSCRIPTION
        ===================== */
        writer.println();
        writer.println("Transcription");
        writer.println("----------------------------------------------");
        writer.println(wrapText(transcription.getContent(), 70));

        /* =====================
        SUMMARY
        ===================== */
        writer.println();
        writer.println("==============================================");
        writer.println();
        writer.println("Summary");
        writer.println("----------------------------------------------");

        if (transcription.getSummary() != null) {
            writer.println(formatSummary(transcription.getSummary(), 70));
        }

        writer.flush();
        return out;
    }

    private String formatRow(String l1, String v1, String l2, String v2) {
        return padRight(l1 + " : " + nullSafe(v1), 30) + (l2.isBlank() ? "" : l2 + " : " + nullSafe(v2));
    }

    private String nullSafe(String value) {
        return value == null ? "" : value;
    }

    private String padRight(String text, int width) {
        if (text == null) return "";
        return String.format("%-" + width + "s", text);
    }

    private String wrapText(String text, int maxLineLength) {
        if (text == null) return "";

        StringBuilder result = new StringBuilder();
        int lineLength = 0;

        for (String word : text.split(" ")) {
            if (lineLength + word.length() > maxLineLength) {
                result.append("\n");
                lineLength = 0;
            }
            result.append(word).append(" ");
            lineLength += word.length() + 1;
        }
        return result.toString();
    }

    private String formatSummary(String text, int maxLineLength) {
        return text.startsWith("-") ? wrapText(text, maxLineLength) : "- " + wrapText(text, maxLineLength);
    }
}
