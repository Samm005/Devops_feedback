package com.example.feedback.controller;

import com.example.feedback.model.Feedback;
import com.example.feedback.service.FeedbackService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin
public class FeedbackController {

    @Autowired
    private FeedbackService service;

    @PostMapping
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return service.saveFeedback(feedback);
    }

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return service.getAllFeedback();
    }

    @GetMapping("/{id}")
    public Feedback getFeedbackById(@PathVariable Long id) {
        return service.getFeedbackById(id);
    }

    @PutMapping("/{id}")
    public Feedback updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        return service.updateFeedback(id, feedback);
    }

    @DeleteMapping("/{id}")
    public String deleteFeedback(@PathVariable Long id) {
        service.deleteFeedback(id);
        return "Deleted successfully";
    }
}