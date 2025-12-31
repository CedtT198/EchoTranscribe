package com.speech_to_text.application.domain.port.in;

import org.springframework.web.multipart.MultipartFile;

public interface MediaFileUseCase {
    public MultipartFile extractAudioFromVideo(MultipartFile audio);
    public MultipartFile convertAudio(MultipartFile audio, String targetFormat);
}
