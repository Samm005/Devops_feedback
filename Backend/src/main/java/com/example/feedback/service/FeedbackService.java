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
        validateFeedback(feedback);

        if (feedback.getUsername() == null || feedback.getUsername().isEmpty()) {
            throw new RuntimeException("Username required");
        }

        return repo.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return repo.findAll();
    }

    public Feedback getFeedbackById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
    }

    public Feedback updateFeedback(Long id, Feedback newFeedback) {
        Feedback existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        existing.setProjectName(newFeedback.getProjectName());
        existing.setRating(newFeedback.getRating());
        existing.setMessage(newFeedback.getMessage());
        existing.setCategory(newFeedback.getCategory());

        return repo.save(existing);
    }

    public void deleteFeedback(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Feedback not found");
        }
        repo.deleteById(id);
    }

    private void validateFeedback(Feedback feedback) {
        if (feedback.getProjectName() == null || feedback.getProjectName().isEmpty()) {
            throw new RuntimeException("Project name required");
        }

        if (feedback.getRating() == null || feedback.getRating() < 1 || feedback.getRating() > 5) {
            throw new RuntimeException("Rating must be 1-5");
        }

        if (feedback.getMessage() == null || feedback.getMessage().isEmpty()) {
            throw new RuntimeException("Message required");
        }
    }
}