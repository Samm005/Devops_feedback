package com.example.feedback.repository;

import com.example.feedback.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByProjectName(String projectName);

    List<Feedback> findByCategory(String category);
}