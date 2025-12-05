package com.speech_to_text.application.infrastructure.mapper;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BaseMapper {
    
    <T, U> U map(T source, Class<U> targetClass);
}
