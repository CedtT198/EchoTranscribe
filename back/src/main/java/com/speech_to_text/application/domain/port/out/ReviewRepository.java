package com.speech_to_text.application.domain.port.out;

import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.speech_to_text.application.domain.model.others.Review;

public interface ReviewRepository {
    public Page<Review> findAll(Pageable pageable);
    public Page<Review> findByStarIn(List<Double> stars, Pageable pageable);
    public List<Map<String, Object>> getReviewStatistics();
    public Review save(Review user);
    public Review update(Review user);
    public boolean delete(String id);
    public Review findByAuth0id(String id);
}
