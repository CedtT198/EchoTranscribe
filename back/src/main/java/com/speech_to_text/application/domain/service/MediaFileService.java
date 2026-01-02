package com.speech_to_text.application.domain.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.github.kokorin.jaffree.ffmpeg.FFmpeg;
import com.github.kokorin.jaffree.ffmpeg.PipeInput;
import com.github.kokorin.jaffree.ffmpeg.UrlOutput;
import com.google.protobuf.ByteString;
import com.speech_to_text.application.domain.port.in.MediaFileUseCase;

@Service
public class MediaFileService implements MediaFileUseCase {

    @Override
    public ByteString convertAudiotoFLAC(MultipartFile file) throws IOException {
        Path tempFile = Files.createTempFile("transcribe_", ".flac");

        try {
            FFmpeg.atPath()
                .addInput(PipeInput.pumpFrom(file.getInputStream()))
                .addArgument("-vn")
                .addArguments("-ac", "1")
                .addArguments("-ar", "16000")
                // .addArguments("-f", "flac")
                .addArguments("-c:a", "flac")
                .addArguments("-compression_level", "5")
                .addOutput(UrlOutput.toPath(tempFile))
                .setOverwriteOutput(true)
                .execute();
            
            byte[] flacBytes = Files.readAllBytes(tempFile);
            return ByteString.copyFrom(flacBytes);
        }
        finally {
            Files.deleteIfExists(tempFile);
        }
    }
}
