package com.speech_to_text.application.domain.model.DTO;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewStatsDTO {
    long totalReviews;
    double averageStar;
    Map<Integer, Object> starCounts;
}