package com.speech_to_text.application.domain.service.withDependance;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import com.speech_to_text.application.domain.model.DTO.ReviewStatsDTO;
import com.speech_to_text.application.domain.model.others.Review;
import com.speech_to_text.application.domain.port.in.ReviewUseCase;
import com.speech_to_text.application.domain.port.out.ReviewRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewService implements ReviewUseCase {

    private final ReviewRepository reviewRepository;

    @Override
    public ReviewStatsDTO getReviewStatistics() {
        List<Map<String, Object>> results = reviewRepository.getReviewStatistics();

        if (results.isEmpty()) {
            return new ReviewStatsDTO(0, 0.0, new HashMap<>());
        }

        Map<String, Object> result = results.get(0);

        List<Map<String, Object>> starsList = (List<Map<String, Object>>) result.get("stars");
        Map<Integer, Object> starCounts = new HashMap<>();
        if (starsList != null) {
            for (Map<String, Object> starMap : starsList) {
                Number star = (Number) starMap.get("_id");   // star value (1-5)
                Number count = (Number) starMap.get("count"); // number of reviews
                if (star != null && count != null) {
                    starCounts.put(star.intValue(), count);
                }
            }
        }

        List<Map<String, Object>> globalList = (List<Map<String, Object>>) result.get("global");
        long totalReviews = 0;
        double averageStar = 0.0;

        if (globalList != null && !globalList.isEmpty()) {
            Map<String, Object> global = globalList.get(0);
            Number totalReviewsNum = (Number) global.get("totalReviews");
            Number averageStarNum = (Number) global.get("averageStar");
            if (totalReviewsNum != null) totalReviews = totalReviewsNum.longValue();
            if (averageStarNum != null) {
                double avg = averageStarNum.doubleValue();
                averageStar = Math.round(avg * 10.0) / 10.0;
            }
        }

        return new ReviewStatsDTO(totalReviews, averageStar, starCounts);
    }


    @Override
    public boolean hasCommented(String auth0id) {
        Review review = reviewRepository.findByAuth0id(auth0id);
        if (review == null) {
            return false;
        }
        return true;
    }

    @Override
    public Page<Review> findByStarIn(List<Double> stars, Pageable pageable) {
        if (stars == null || stars.isEmpty()) {
            return reviewRepository.findAll(pageable);
        }
        return reviewRepository.findByStarIn(stars, pageable);
    }


    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }


    @Override
    public Review update(Review review) {
        return reviewRepository.update(review);
    }


    @Override
    public boolean delete(String id) {
        return reviewRepository.delete(id);
    }
    
}
