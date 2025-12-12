package com.speech_to_text.application.infrastructure.mapper;

import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BaseMapperImpl implements BaseMapper {

    private final MapStructDelegate delegate = Mappers.getMapper(MapStructDelegate.class);

    @Override
    public <T, U> U map(T source, Class<U> targetClass) {
        if (source == null) return null;

        try {
            U target = targetClass.getDeclaredConstructor().newInstance();
            delegate.copy(source, target);
            return target;
        } catch (Exception e) {
            throw new RuntimeException("Mapping error", e);
        }
    }
}