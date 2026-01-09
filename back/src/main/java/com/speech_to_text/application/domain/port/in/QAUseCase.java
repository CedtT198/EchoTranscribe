package com.speech_to_text.application.domain.port.in;

import java.util.List;
import com.speech_to_text.application.domain.model.others.QA;

public interface QAUseCase {
    public List<QA> findAll();
    public List<QA> findAllAbout(String about);
}
