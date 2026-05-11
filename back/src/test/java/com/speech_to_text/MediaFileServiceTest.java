package com.speech_to_text;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import com.google.cloud.WriteChannel;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.protobuf.ByteString;
import com.speech_to_text.application.domain.service.withDependance.MediaFileService;

class MediaFileServiceTest {

    private MediaFileService service;

    @BeforeEach
    void setUp() {
        service = new MediaFileService();
    }

    @Test
    void shouldUploadFileToGCS() throws Exception {
        String bucket = "test-bucket";
        String fileName = "audio.mp3";

        ByteString data = ByteString.copyFrom("fake audio".getBytes(StandardCharsets.UTF_8));

        Storage storage = mock(Storage.class);
        StorageOptions storageOptions = mock(StorageOptions.class);
        WriteChannel writeChannel = mock(WriteChannel.class);

        when(storageOptions.getService()).thenReturn(storage);
        when(storage.writer(any(BlobInfo.class))).thenReturn(writeChannel);

        try (MockedStatic<StorageOptions> mockedStatic = mockStatic(StorageOptions.class)) {

            mockedStatic.when(StorageOptions::getDefaultInstance).thenReturn(storageOptions);

            String result = service.uploadToGCS(bucket, fileName, data);

            assertNotNull(result);
            assertEquals("gs://test-bucket/audio.flac", result);

            verify(storage, times(1)).writer(any(BlobInfo.class));
            verify(writeChannel, atLeastOnce()).write(any());
        }
    }

    @Test
    void shouldConvertAudioToFlac() throws Exception {

        byte[] fakeAudio = "fake-audio-content".getBytes();

        MultipartFile multipartFile = new MockMultipartFile(
                "file",
                "audio.mp3",
                "audio/mpeg",
                fakeAudio
        );

        assertThrows(Exception.class, () -> {
            service.convertAudiotoFLAC(multipartFile);
        });
    }

    @Test
    void shouldThrowExceptionWhenConversionFails() {
        MultipartFile multipartFile = mock(MultipartFile.class);

        assertThrows(Exception.class, () -> {
            when(multipartFile.getOriginalFilename()).thenReturn("audio.mp3");
            when(multipartFile.getInputStream()).thenThrow(new IOException("InputStream error"));

            service.convertAudiotoFLAC(multipartFile);
        });
    }
}