package com.speech_to_text.application.domain.service;

import java.io.IOException;
import java.io.PipedOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.github.kokorin.jaffree.LogLevel;
import com.github.kokorin.jaffree.ffmpeg.FFmpeg;
import com.github.kokorin.jaffree.ffmpeg.NullOutput;
import com.github.kokorin.jaffree.ffmpeg.PipeInput;
import com.github.kokorin.jaffree.ffmpeg.PipeOutput;
import com.github.kokorin.jaffree.ffmpeg.UrlInput;
import com.github.kokorin.jaffree.ffmpeg.UrlOutput;
import com.github.kokorin.jaffree.ffprobe.FFprobe;
import com.github.kokorin.jaffree.ffprobe.FFprobeResult;
import com.google.protobuf.ByteString;
import com.speech_to_text.application.domain.port.in.MediaFileUseCase;

import io.grpc.Context.Storage;

import org.apache.commons.io.FilenameUtils;

@Service
public class MediaFileService implements MediaFileUseCase {

    // @Override
    // public int getDuration(MultipartFile file) throws Exception {
    //     FFprobe ffprobe = FFprobe.atPath()
    //         .setShowFormat(true)
    //         .setInput(file.getInputStream());

    //     FFprobeResult result = ffprobe.execute();

    //     Float durationFloat = result.getFormat().getDuration();
    //     if (durationFloat == null) {
    //         throw new Exception("Undetectable duration in the file.");
    //     }

    //     int durationSeconds = (int) durationFloat.floatValue();
    //     System.out.println("File duration: "+durationSeconds+" sec");
    //     return durationSeconds;
    // }

    @Override
    public String uploadToGCS(String bucketName, String fileName, ByteString data) throws IOException {
        // Storage storage = StorageOptions.getDefaultInstance().getService();
        // BlobId blobId = BlobId.of(bucketName, fileName);
        // BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("audio/flac").build();
        // storage.create(blobInfo, data.toByteArray());
        // return "gs://" + bucketName + "/" + fileName;
        return"";
    }

    @Override
    public void deleteFromGCS(String bucketName, String fileName) {
        // Storage storage = StorageOptions.getDefaultInstance().getService();
        // BlobId blobId = BlobId.of(bucketName, fileName);
        // storage.delete(blobId);
    }

    @Override
    public ByteString convertAudiotoFLAC(MultipartFile file) throws Exception {
        String originalFilename = file.getOriginalFilename();
        Path tempFlacFile = Files.createTempFile("transcribe_", ".flac");

        try {
            Path tempInputFile = Files.createTempFile("upload_", 
                originalFilename != null ? "." + FilenameUtils.getExtension(originalFilename) : ".audio");

            try {
                Files.copy(file.getInputStream(), tempInputFile, StandardCopyOption.REPLACE_EXISTING);

                FFmpeg.atPath()
                    .addInput(UrlInput.fromPath(tempInputFile))
                    .addArgument("-vn")
                    .addArguments("-ac", "1")
                    .addArguments("-ar", "16000")
                    .addArguments("-c:a", "flac")
                    .addArguments("-compression_level", "5")
                    .addOutput(UrlOutput.toPath(tempFlacFile))
                    .setOverwriteOutput(true)
                    .execute();

                if (Files.size(tempFlacFile) == 0) {
                    throw new IOException("Generated FLAC file empty.");
                }
            } finally {
                Files.deleteIfExists(tempInputFile);
            }

            byte[] flacBytes = Files.readAllBytes(tempFlacFile);
            return ByteString.copyFrom(flacBytes);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        } finally {
            Files.deleteIfExists(tempFlacFile);
        }
        
    //     Path tempFile = Files.createTempFile("transcribe_", ".flac");

    //     try {
    //         FFmpeg.atPath()
    //             .addInput(PipeInput.pumpFrom(file.getInputStream()))
    //             .addArgument("-vn")
    //             .addArguments("-ac", "1")
    //             .addArguments("-ar", "16000")
    //             // .addArguments("-f", "flac")
    //             .addArguments("-c:a", "flac")
    //             .addArguments("-compression_level", "5")
    //             .addOutput(UrlOutput.toPath(tempFile))
    //             .setOverwriteOutput(true)
    //             .execute();
            
    //         byte[] flacBytes = Files.readAllBytes(tempFile);
    //         return ByteString.copyFrom(flacBytes);
    //     }
    //     finally {
    //         Files.deleteIfExists(tempFile);
    //     }
    }
}

