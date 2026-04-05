package com.example.feedback.controller;

import com.example.feedback.model.Feedback;
import com.example.feedback.service.FeedbackService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackService service;

    // CREATE FEEDBACK
    @PostMapping("/create")
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback) {
        try {
            Feedback savedFeedback = service.saveFeedback(feedback);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", savedFeedback,
                    "message", "Feedback created successfully"
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Error creating feedback",
                    "error", e.getMessage()
            ));
        }
    }

    // GET ALL FEEDBACK
    @GetMapping
    public ResponseEntity<?> getAllFeedback() {
        try {
            List<Feedback> feedbackList = service.getAllFeedback();

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", feedbackList
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Error fetching feedback",
                    "error", e.getMessage()
            ));
        }
    }

    // GET FEEDBACK BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getFeedbackById(@PathVariable Long id) {
        try {
            Feedback feedback = service.getFeedbackById(id);

            if (feedback == null) {
                return ResponseEntity.status(404).body(Map.of(
                        "success", false,
                        "message", "Feedback not found"
                ));
            }

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", feedback
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Error fetching feedback",
                    "error", e.getMessage()
            ));
        }
    }

    // UPDATE FEEDBACK
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        try {
            Feedback updatedFeedback = service.updateFeedback(id, feedback);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", updatedFeedback,
                    "message", "Feedback updated successfully"
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Error updating feedback",
                    "error", e.getMessage()
            ));
        }
    }

    // DELETE FEEDBACK
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        try {
            service.deleteFeedback(id);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Feedback deleted successfully"
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Error deleting feedback",
                    "error", e.getMessage()
            ));
        }
    }
}