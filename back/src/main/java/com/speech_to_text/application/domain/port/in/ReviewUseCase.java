package com.speech_to_text.application.domain.port.in;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.speech_to_text.application.domain.model.DTO.ReviewStatsDTO;
import com.speech_to_text.application.domain.model.others.Review;

public interface ReviewUseCase {
    public Page<Review> findByStarIn(List<Double> stars, Pageable pageable);
    public ReviewStatsDTO getReviewStatistics();
    public Review save(Review review);
    public Review update(Review review);
    public boolean delete(String id);
    public boolean hasCommented(String auth0id);
}
