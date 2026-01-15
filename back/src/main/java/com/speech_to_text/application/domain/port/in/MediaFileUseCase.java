package com.speech_to_text.application.domain.port.in;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import com.google.protobuf.ByteString;

public interface MediaFileUseCase {
    // works for video or audio in every formats
    // public String convertAndUpload(MultipartFile file, String bucketName, String fileName) throws Exception;
    public ByteString convertAudiotoFLAC(MultipartFile file) throws Exception;
    public String uploadToGCS(String bucketName, String fileName, ByteString data) throws IOException;
    public void deleteFromGCS(String bucketName, String fileName);
    // public int getDuration(MultipartFile file) throws Exception;
}
