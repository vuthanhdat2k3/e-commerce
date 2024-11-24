package com.ecommerce.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class SentimentAnalysisService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiUrl = "http://127.0.0.1:5000/analyze-sentiment";

    public String analyzeReviewSentiment(String reviewText) {
        try {
            var request = new HashMap<String, String>();
            request.put("review_text", reviewText);

            var response = restTemplate.postForObject(apiUrl, request, Map.class);
            return (String) response.get("label"); // Assume API returns {"label": "positive"}
        } catch (Exception e) {
            throw new RuntimeException("Error calling sentiment analysis API: " + e.getMessage(), e);
        }
    }
}


