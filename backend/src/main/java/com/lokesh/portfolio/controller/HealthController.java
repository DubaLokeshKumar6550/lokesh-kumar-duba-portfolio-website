package com.lokesh.portfolio.controller;

import com.lokesh.portfolio.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Autowired(required = false)
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("application", "Duba Lokesh Kumar Portfolio API");
        status.put("javaVersion", System.getProperty("java.version"));
        status.put("timestamp", System.currentTimeMillis());

        boolean dbConnected = false;
        String dbInfo = "Unknown";
        if (jdbcTemplate != null) {
            try {
                jdbcTemplate.execute("SELECT 1");
                dbConnected = true;
                dbInfo = "MySQL (portfolio_db on localhost:3306)";
            } catch (Exception e) {
                dbInfo = "Database disconnected: " + e.getMessage();
            }
        }
        status.put("databaseConnected", dbConnected);
        status.put("database", dbInfo);

        return ResponseEntity.ok(ApiResponse.ok("Service operational", status));
    }
}
