package com.lokesh.portfolio.service;

import com.lokesh.portfolio.dto.AuthRequest;
import com.lokesh.portfolio.dto.AuthResponse;
import com.lokesh.portfolio.model.AdminUser;
import com.lokesh.portfolio.repository.AdminUserRepository;
import com.lokesh.portfolio.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${app.admin.username}")
    private String defaultAdminUsername;

    @Value("${app.admin.password}")
    private String defaultAdminPassword;

    public AuthResponse authenticate(AuthRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            throw new RuntimeException("Username and password are required.");
        }

        // Check database admin user first
        Optional<AdminUser> adminOpt = adminUserRepository.findByUsername(request.getUsername().trim());
        boolean isValid = false;

        if (adminOpt.isPresent()) {
            AdminUser user = adminOpt.get();
            isValid = request.getPassword().equals(user.getPassword());
        } else if (request.getUsername().trim().equalsIgnoreCase(defaultAdminUsername) &&
                   request.getPassword().equals(defaultAdminPassword)) {
            isValid = true;
        }

        if (!isValid) {
            throw new RuntimeException("Invalid username or password.");
        }

        String token = jwtUtil.generateToken(request.getUsername());
        return new AuthResponse(token, request.getUsername(), "ROLE_ADMIN");
    }

    public boolean updatePassword(String username, String currentPassword, String newPassword) {
        Optional<AdminUser> adminOpt = adminUserRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            AdminUser user = adminOpt.get();
            if (user.getPassword().equals(currentPassword)) {
                user.setPassword(newPassword);
                adminUserRepository.save(user);
                return true;
            }
        } else if (username.equalsIgnoreCase(defaultAdminUsername) && currentPassword.equals(defaultAdminPassword)) {
            AdminUser newUser = new AdminUser(username, newPassword, "dubalokeshkumar6550@gmail.com");
            adminUserRepository.save(newUser);
            return true;
        }
        return false;
    }
}
