package com.speech_to_text.application.domain.port.out;

import com.speech_to_text.application.domain.model.DTO.TranscribeSettings;

public interface TranscriptionSettingsRepository  {
    TranscribeSettings findByAuth0IdAndType(String auth0Id, String transcribeType);
}
