package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.others.Review;
import com.speech_to_text.application.domain.port.in.ReviewUseCase;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewUseCase reviewUseCase;
    
    @GetMapping("/findByStars")
    public ResponseEntity<?> findByStars(
        @RequestParam(required = false) List<Double> stars,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "createdDate,desc") String sort,
        @RequestParam String auth0Id)
    {   
        Sort.Direction direction = Sort.Direction.fromString(sort.split(",")[1]);
        String sortProperty = sort.split(",")[0];
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortProperty));

        Page<Review> reviews = reviewUseCase.findByStarIn(stars, pageable);

        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        return ResponseEntity.ok(reviewUseCase.getReviewStatistics());
    }

    @GetMapping("/hasCommented/{auth0id}")
    public ResponseEntity<?> hasCommented(@PathVariable String auth0id) {
        return ResponseEntity.ok(reviewUseCase.hasCommented(auth0id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        return ResponseEntity.ok(reviewUseCase.delete(id));
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody Review review) {
        return ResponseEntity.ok(reviewUseCase.update(review));
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Review review) {
        Map<String, String> res = new HashMap<>();

        reviewUseCase.save(review);
        
        res.put("success", "Thanks for your review, wether it\'s a bad or good one, it really helps us to provide you   better Speech to text transcription.");
        return ResponseEntity.status(200).body(res);
    }
}
