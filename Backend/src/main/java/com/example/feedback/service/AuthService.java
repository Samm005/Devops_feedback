package com.example.feedback.service;

import com.example.feedback.model.User;
import com.example.feedback.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    public String register(User user) {
        if (repo.findByUsername(user.getUsername()).isPresent()) {
            return "User already exists";
        }

        repo.save(user);
        return "Registered Successfully";
    }

    public String login(User user) {
        User existing = repo.findByUsername(user.getUsername()).orElse(null);

        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            return "Login Successful";
        }

        return "Invalid Credentials";
    }
}