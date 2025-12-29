package com.speech_to_text.application.domain.port.out;

import java.util.List;
import com.speech_to_text.application.domain.model.QA;

public interface QARepository {
    public List<QA> findAll();
    public List<QA> findAllAbout(String about);
}
