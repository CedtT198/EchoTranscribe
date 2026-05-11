package com.speech_to_text;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.*;
import com.speech_to_text.application.domain.model.DTO.ReviewStatsDTO;
import com.speech_to_text.application.domain.model.others.Review;
import com.speech_to_text.application.domain.port.out.ReviewRepository;
import com.speech_to_text.application.domain.service.withDependance.ReviewService;

class ReviewServiceTest {

    private ReviewRepository reviewRepository;
    private ReviewService reviewService;

    @BeforeEach
    void setUp() {
        reviewRepository = mock(ReviewRepository.class);
        reviewService = new ReviewService(reviewRepository);
    }

    @Test
    void shouldReturnEmptyStatisticsWhenNoReviews() {
        when(reviewRepository.getReviewStatistics()).thenReturn(Collections.emptyList());

        ReviewStatsDTO result = reviewService.getReviewStatistics();

        assertNotNull(result);
        assertEquals(0, result.getTotalReviews());
        assertEquals(0.0, result.getAverageStar());
        assertTrue(result.getStarCounts().isEmpty());
    }

    @Test
    void shouldReturnReviewStatisticsSuccessfully() {
        Map<String, Object> star1 = new HashMap<>();
        star1.put("_id", 5);
        star1.put("count", 10);

        Map<String, Object> star2 = new HashMap<>();
        star2.put("_id", 4);
        star2.put("count", 5);

        List<Map<String, Object>> stars = List.of(star1, star2);

        Map<String, Object> global = new HashMap<>();
        global.put("totalReviews", 15);
        global.put("averageStar", 4.666);

        List<Map<String, Object>> globalList = List.of(global);

        Map<String, Object> aggregationResult = new HashMap<>();
        aggregationResult.put("stars", stars);
        aggregationResult.put("global", globalList);

        when(reviewRepository.getReviewStatistics()).thenReturn(List.of(aggregationResult));

        ReviewStatsDTO result = reviewService.getReviewStatistics();

        assertNotNull(result);
        assertEquals(15, result.getTotalReviews());
        assertEquals(4.7, result.getAverageStar());
        assertEquals(10,((Number) result.getStarCounts().get(5)).intValue());
        assertEquals(5,((Number) result.getStarCounts().get(4)).intValue());
    }

    @Test
    void shouldReturnFalseWhenUserHasNotCommented() {

        when(reviewRepository.findByAuth0id("auth0|123")).thenReturn(null);

        boolean result = reviewService.hasCommented("auth0|123");
        assertFalse(result);
    }

    @Test
    void shouldReturnTrueWhenUserHasCommented() {
        Review review = new Review();
        when(reviewRepository.findByAuth0id("auth0|456")).thenReturn(review);

        boolean result = reviewService.hasCommented("auth0|456");
        assertTrue(result);
    }

    @Test
    void shouldReturnAllReviewsWhenStarsIsNull() {
        Pageable pageable = PageRequest.of(0, 10);

        Page<Review> reviewPage = new PageImpl<>(Collections.emptyList());
        when(reviewRepository.findAll(pageable)).thenReturn(reviewPage);

        Page<Review> result = reviewService.findByStarIn(null, pageable);
        assertNotNull(result);

        verify(reviewRepository, times(1)).findAll(pageable);
    }

    @Test
    void shouldReturnAllReviewsWhenStarsIsEmpty() {
        Pageable pageable = PageRequest.of(0, 10);

        Page<Review> reviewPage = new PageImpl<>(Collections.emptyList());
        when(reviewRepository.findAll(pageable)).thenReturn(reviewPage);

        Page<Review> result = reviewService.findByStarIn(Collections.emptyList(), pageable);
        assertNotNull(result);

        verify(reviewRepository, times(1)).findAll(pageable);
    }

    @Test
    void shouldReturnFilteredReviewsWhenStarsProvided() {

        Pageable pageable = PageRequest.of(0, 10);

        List<Double> stars = List.of(4.0, 5.0);

        Page<Review> reviewPage = new PageImpl<>(Collections.emptyList());
        when(reviewRepository.findByStarIn(stars, pageable)).thenReturn(reviewPage);

        Page<Review> result = reviewService.findByStarIn(stars, pageable);
        assertNotNull(result);

        verify(reviewRepository, times(1)).findByStarIn(stars, pageable);
    }
}