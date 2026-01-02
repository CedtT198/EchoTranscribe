package com.speech_to_text.application.domain.port.in;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import com.google.protobuf.ByteString;

public interface MediaFileUseCase {
    // works for video or audio in every formats
    public ByteString convertAudiotoFLAC(MultipartFile audio) throws IOException;
}
