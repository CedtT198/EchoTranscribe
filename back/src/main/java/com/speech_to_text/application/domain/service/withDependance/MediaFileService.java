package com.speech_to_text.application.domain.service.withDependance;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import com.google.common.io.ByteStreams;
import com.google.cloud.WriteChannel;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.protobuf.ByteString;
import com.speech_to_text.application.domain.port.in.MediaFileUseCase;
import lombok.AllArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import java.nio.ByteBuffer;

@Service
@AllArgsConstructor
public class MediaFileService implements MediaFileUseCase {

    // @Override
    // public String convertAndUpload(MultipartFile file, String bucketName, String fileName) throws Exception {
    //     System.out.println("Converting "+fileName+" into FLAC file.");
    //     String originalFilename = file.getOriginalFilename();
    //     Path tempInputFile = null;

    //     try {
    //         // 1. Écrire le fichier uploadé sur disque temporaire (nécessaire pour Jaffree)
    //         String extension = originalFilename != null ? "." + FilenameUtils.getExtension(originalFilename) : ".audio";
    //         tempInputFile = Files.createTempFile("upload_", extension);

    //         Files.copy(file.getInputStream(), tempInputFile, StandardCopyOption.REPLACE_EXISTING);

    //         // 2. Préparer le pipe : FFmpeg va écrire le FLAC directement dans un stream
    //         PipedOutputStream pipedOutput = new PipedOutputStream();
    //         PipedInputStream pipedInput = new PipedInputStream(pipedOutput, 16 * 1024 * 1024);

    //         // 3. Lancer FFmpeg en arrière-plan : sortie FLAC vers le pipe
    //         FFmpeg.atPath()
    //                 .addInput(UrlInput.fromPath(tempInputFile))
    //                 .addArgument("-vn")
    //                 .addArguments("-ac", "1")
    //                 .addArguments("-ar", "16000")
    //                 .addArguments("-c:a", "flac")
    //                 .addArguments("-compression_level", "5")
    //                 .addOutput(PipeOutput.pumpTo(pipedOutput))
    //                 .setOverwriteOutput(true)
    //                 .executeAsync();

    //         // 4. Upload streaming simultané vers GCS
    //         System.out.println("Uploading "+fileName+" to Google Cloud Storage.");
    //         Storage storage = StorageOptions.getDefaultInstance().getService();
    //         BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fileName + ".flac")
    //                 .setContentType("audio/flac")
    //                 .build();

    //         try (WriteChannel writer = storage.writer(blobInfo)) {
    //             byte[] buffer = new byte[1024 * 1024];
    //             int bytesRead;
    //             long totalBytes = 0; 
    //             while ((bytesRead = pipedInput.read(buffer)) != -1) {
    //                 writer.write(ByteBuffer.wrap(buffer, 0, bytesRead));
    //                 totalBytes += bytesRead;
    //                 System.out.println("Uploaded: " + totalBytes / (1024*1024) + " Mo");
    //             }
    //             // writer.close() finalise l'upload
    //         }

    //         // 5. Retourner l'URI GCS (ou juste le ByteString si tu en as besoin plus tard)
    //         String gcsUri = "gs://" + bucketName + "/" + fileName + ".flac";
    //         System.out.println("Upload done : " + gcsUri);

    //         // Optionnel : si tu as besoin du ByteString pour autre chose (pas recommandé)
    //         // Mais ici tu peux juste retourner ByteString.EMPTY ou null, car le fichier est déjà en GCS
    //         return "";

    //     } catch (Exception e) {
    //         throw new Exception("Error converting/uploading : " + e.getMessage(), e);
    //     } finally {
    //         // Nettoyage
    //         if (tempInputFile != null) {
    //             Files.deleteIfExists(tempInputFile);
    //         }
    //     }
    // }

    @Override
    public String uploadToGCS(String bucketName, String fileName, ByteString data) throws IOException {
        System.out.println("Uploading "+fileName+" to Google Cloud Storage.");

        // Storage storage = StorageOptions.getDefaultInstance().getService(); 

        // // Récupère les métadonnées du fichier
        // String contentType = file.getContentType();
        // long size = file.getSize();

        // // Crée les infos de l'objet GCS
        // BlobId blobId = BlobId.of(bucketName, fileName);
        // BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
        //         .setContentType(contentType != null ? contentType : "application/octet-stream")
        //         .build();

        // // Upload direct depuis l'InputStream du MultipartFile
        // try (InputStream inputStream = file.getInputStream()) {
        //     Blob blob = storage.createFrom(blobInfo, inputStream);

        //     System.out.printf("Fichier %s (%d octets) uploadé vers gs://%s/%s%n",
        //             file.getOriginalFilename(), size, bucketName, fileName);

        //     // Optionnel : rendre l'objet public
        //     // blob.toBuilder().setAcl(Arrays.asList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER))).build().update();

        //     // Retourne l'URL média (valable avec un token, pour accès signé) ou une URL publique si activée
        //     return blob.getMediaLink(); 
        // }

        Storage storage = StorageOptions.getDefaultInstance().getService(); 

        String baseName = (fileName != null) ? fileName.substring(0, fileName.lastIndexOf('.')) : "audio";
        String gcsFileName = baseName + ".flac";
        
        BlobId blobId = BlobId.of(bucketName, gcsFileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("audio/flac").build();
        
        ByteArrayInputStream inputStream = new ByteArrayInputStream(data.toByteArray());

        try (WriteChannel writer = storage.writer(blobInfo)) { 
            byte[] buffer = new byte[1024 * 1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                writer.write(ByteBuffer.wrap(buffer, 0, bytesRead));
            }
        }
        
        System.out.println("Upload done.\n");
        return "gs://" + bucketName + "/" + gcsFileName;
    }

    @Override
    public void deleteFromGCS(String bucketName, String fileName) {
        // Storage storage = StorageOptions.getDefaultInstance().getService();
        // BlobId blobId = BlobId.of(bucketName, fileName);
        // storage.delete(blobId);
    }

    @Override
    public ByteString convertAudiotoFLAC(MultipartFile file) throws Exception {
        System.out.println("Conversion of "+file.getOriginalFilename()+" into .flac");
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
    }

    
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
}

