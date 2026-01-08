package com.speech_to_text.application.domain.port.in;

import java.io.ByteArrayOutputStream;
import com.speech_to_text.application.domain.model.transcription.Transcription;

public interface ExportUseCase {
    public ByteArrayOutputStream generatePdf(Transcription transcription) throws Exception;
    public ByteArrayOutputStream generateDocx(Transcription transcription) throws Exception;
    public ByteArrayOutputStream generateTxt(Transcription transcription) throws Exception;
}
