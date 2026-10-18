package com.lokesh.portfolio.controller;

import com.lokesh.portfolio.dto.ApiResponse;
import com.lokesh.portfolio.dto.AuthRequest;
import com.lokesh.portfolio.dto.AuthResponse;
import com.lokesh.portfolio.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.authenticate(request);
            return ResponseEntity.ok(ApiResponse.ok("Login successful", response));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String currentPassword = body.get("currentPassword");
        String newPassword = body.get("newPassword");

        if (authService.updatePassword(username, currentPassword, newPassword)) {
            return ResponseEntity.ok(ApiResponse.ok("Password updated successfully", null));
        } else {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update password. Verify current password."));
        }
    }
}
