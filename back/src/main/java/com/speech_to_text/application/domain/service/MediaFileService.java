package com.speech_to_text.application.domain.service;

import org.springframework.web.multipart.MultipartFile;

import com.speech_to_text.application.domain.port.in.MediaFileUseCase;

public class MediaFileService implements MediaFileUseCase {

    @Override
    public MultipartFile extractAudioFromVideo(MultipartFile audio) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'extractAudioFromVideo'");
    }

    @Override
    public MultipartFile convertAudio(MultipartFile audio, String targetFormat) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'convertAudio'");
    }
}
