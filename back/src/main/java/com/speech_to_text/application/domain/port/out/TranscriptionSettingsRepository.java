package com.speech_to_text.application.domain.port.out;

import com.speech_to_text.application.domain.model.DTO.TranscriptionSettings;

public interface TranscriptionSettingsRepository  {
    public TranscriptionSettings findByAuth0IdAndType(String auth0Id, String transcribeType);
}
