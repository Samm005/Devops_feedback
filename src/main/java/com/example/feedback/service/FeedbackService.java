package com.example.feedback.service;

import com.example.feedback.model.Feedback;
import com.example.feedback.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository repo;

    public Feedback saveFeedback(Feedback feedback) {
        return repo.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return repo.findAll();
    }

    public Feedback getFeedbackById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Feedback updateFeedback(Long id, Feedback newFeedback) {
        Feedback feedback = repo.findById(id).orElse(null);

        if (feedback != null) {
            feedback.setProjectName(newFeedback.getProjectName());
            feedback.setRating(newFeedback.getRating());
            feedback.setMessage(newFeedback.getMessage());
            feedback.setCategory(newFeedback.getCategory());
            return repo.save(feedback);
        }
        return null;
    }

    public void deleteFeedback(Long id) {
        repo.deleteById(id);
    }
}