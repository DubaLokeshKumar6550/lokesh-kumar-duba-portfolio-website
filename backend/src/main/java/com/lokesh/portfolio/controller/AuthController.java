package com.lokesh.portfolio.controller;

import com.lokesh.portfolio.dto.ApiResponse;
import com.lokesh.portfolio.dto.AuthRequest;
import com.lokesh.portfolio.dto.AuthResponse;
import com.lokesh.portfolio.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;

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

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiResponse.error("Public administrator registration is permanently disabled. Admin privileges cannot be assigned."));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@RequestBody Map<String, String> body, HttpServletRequest request) {
        String authenticatedEmail = (String) request.getAttribute("authenticatedEmail");
        String authenticatedUser = (String) request.getAttribute("authenticatedUser");

        String username = body.get("username");
        if (username == null || username.trim().isEmpty()) {
            username = authenticatedEmail != null ? authenticatedEmail : authenticatedUser;
        }

        String currentPassword = body.get("currentPassword");
        String newPassword = body.get("newPassword");

        if (newPassword == null || newPassword.trim().length() < 6) {
            return ResponseEntity.badRequest().body(ApiResponse.error("New password must be at least 6 characters."));
        }

        if (authService.updatePassword(username, currentPassword, newPassword)) {
            return ResponseEntity.ok(ApiResponse.ok("Password updated successfully", null));
        } else {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update password. Verify current password."));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Map<String, Object>>> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.trim().isEmpty()) {
            email = body.get("username");
        }
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Administrator email or username is required."));
        }
        try {
            Map<String, Object> result = authService.generatePasswordResetOtp(email.trim());
            return ResponseEntity.ok(ApiResponse.ok("Verification code generated successfully.", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.trim().isEmpty()) {
            email = body.get("username");
        }
        String otp = body.get("otp");
        String newPassword = body.get("newPassword");

        if (email == null || otp == null || newPassword == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Email, verification OTP, and new password are required."));
        }
        if (newPassword.trim().length() < 6) {
            return ResponseEntity.badRequest().body(ApiResponse.error("New password must be at least 6 characters."));
        }

        try {
            boolean success = authService.resetPasswordWithOtp(email.trim(), otp.trim(), newPassword.trim());
            if (success) {
                return ResponseEntity.ok(ApiResponse.ok("Password successfully reset! You can now log in with your new password.", null));
            } else {
                return ResponseEntity.badRequest().body(ApiResponse.error("Invalid or expired verification code."));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
