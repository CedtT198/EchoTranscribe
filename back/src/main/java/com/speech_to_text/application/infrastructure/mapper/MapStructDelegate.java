package com.speech_to_text.application.infrastructure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper
public interface MapStructDelegate {
    void copy(Object source, @MappingTarget Object target);
}
