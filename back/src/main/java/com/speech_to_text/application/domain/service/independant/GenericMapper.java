package com.speech_to_text.application.domain.service.independant;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GenericMapper {
    
    private final ObjectMapper objectMapper;

    public <T, U> U map(T source, Class<U> targetClass) {
        if (source == null) {
            return null;
        }
        return objectMapper.convertValue(source, targetClass);
    }

    public <T, U> List<U> mapList(Collection<T> source, Class<U> targetClass) {
        if (source == null) {
            return Collections.emptyList();
        }
        return source.stream().map(item -> map(item, targetClass)).toList();
    }
}
