package com.speech_to_text.application.infrastructure.adapters.persistence;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.speech_to_text.application.domain.model.others.Review;
import com.speech_to_text.application.domain.port.out.ReviewRepository;
import com.speech_to_text.application.domain.service.independant.GenericMapper;
import com.speech_to_text.application.infrastructure.adapters.persistence.entity.ReviewDocument;
import lombok.AllArgsConstructor;

interface SpringDataReview extends MongoRepository<ReviewDocument, String> {
    Optional<List<ReviewDocument>> findByAuth0Id(String auth0Id);
    Page<ReviewDocument> findAll(Pageable pageable);
    Page<ReviewDocument> findByStarsIn(List<Double> stars, Pageable pageable);
    @Aggregation(pipeline = {"""
        {
            $facet: {
                stars: [ { $group: { _id: "$stars", count: { $sum: 1 } } } ],
                global: [ { $group: { _id: null, totalReviews: { $sum: 1 }, averageStar: { $avg: "$stars" } } } ]
            }
        }
    """
    })
    List<Map<String, Object>> getReviewStatistics();
}

@Repository
@AllArgsConstructor
public class MongoReviewRepository implements ReviewRepository {

    private SpringDataReview repo;
    private GenericMapper mapper;
    
    @Override
    public Review findByAuth0id(String auth0id) {
        List<ReviewDocument> docList =  repo.findByAuth0Id(auth0id).orElse(null);
        
        ReviewDocument doc = (docList != null && !docList.isEmpty()) ? docList.get(0) : null;
        return mapper.map(doc, Review.class);
    }    

    @Override
    public List<Map<String, Object>> getReviewStatistics() {
        return repo.getReviewStatistics();
    }    

    @Override
    public Page<Review> findByStarIn(List<Double> stars, Pageable pageable) {
        Page<ReviewDocument> documentPage = repo.findByStarsIn(stars, pageable);
        List<Review> reviewList = mapper.mapList(documentPage.getContent(), Review.class);

        return new PageImpl<>(reviewList, pageable, documentPage.getTotalElements());
    }

    @Override
    public Page<Review> findAll(Pageable pageable) {
        Page<ReviewDocument> documentPage = repo.findAll(pageable);
        List<Review> reviewList = mapper.mapList(documentPage.getContent(), Review.class);

        return new PageImpl<>(reviewList, pageable, documentPage.getTotalElements());
    }

    @Override
    public Review save(Review review) {
        ReviewDocument doc = mapper.map(review, ReviewDocument.class);
        return mapper.map(repo.save(doc), Review.class);
    }

    @Override
    public Review update(Review review) {
        ReviewDocument existing = repo.findById(review.getId()).orElse(null);
        if (existing == null) {
            return null;
        }
        return save(review);
    }

    @Override
    public boolean delete(String id) {
        Optional<ReviewDocument> existing = repo.findById(id);
        if (existing.isPresent()) {
            repo.delete(existing.get());
            return true;
        }
        return false;
    }    

}
