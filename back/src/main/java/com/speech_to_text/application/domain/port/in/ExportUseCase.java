package com.speech_to_text.application.domain.port.in;

import java.io.ByteArrayOutputStream;
import com.speech_to_text.application.domain.model.transcription.Transcription;

public interface ExportUseCase {
    public ByteArrayOutputStream generatePdf(Transcription transcription, String mail) throws Exception;
    public ByteArrayOutputStream generateDocx(Transcription transcription, String mail) throws Exception;
    public ByteArrayOutputStream generateTxt(Transcription transcription, String mail) throws Exception;
}
