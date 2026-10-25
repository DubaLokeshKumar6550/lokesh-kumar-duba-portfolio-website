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

    @Value("${app.admin.email}")
    private String defaultAdminEmail;

    public AuthResponse authenticate(AuthRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            throw new RuntimeException("Username and password are required.");
        }

        String identifier = request.getUsername().trim();

        // Check database admin user by username or email
        Optional<AdminUser> adminOpt = adminUserRepository.findByUsername(identifier);
        if (adminOpt.isEmpty()) {
            adminOpt = adminUserRepository.findByEmail(identifier);
        }

        AdminUser authenticatedUser = null;

        if (adminOpt.isPresent()) {
            AdminUser user = adminOpt.get();
            if (request.getPassword().equals(user.getPassword())) {
                authenticatedUser = user;
            }
        } else if ((identifier.equalsIgnoreCase(defaultAdminUsername) || identifier.equalsIgnoreCase(defaultAdminEmail)) &&
                   request.getPassword().equals(defaultAdminPassword)) {
            authenticatedUser = new AdminUser(defaultAdminUsername, defaultAdminPassword, defaultAdminEmail);
            authenticatedUser.setRole("ROLE_ADMIN");
        }

        if (authenticatedUser == null) {
            throw new RuntimeException("Invalid username or password.");
        }

        // Verify that the account corresponds to the designated administrator email
        String userEmail = authenticatedUser.getEmail();
        if (userEmail == null || !userEmail.equalsIgnoreCase(defaultAdminEmail)) {
            throw new RuntimeException("Access denied: Not an authorized administrator account.");
        }

        String username = authenticatedUser.getUsername() != null ? authenticatedUser.getUsername() : defaultAdminUsername;
        String role = authenticatedUser.getRole() != null ? authenticatedUser.getRole() : "ROLE_ADMIN";

        String token = jwtUtil.generateToken(username, defaultAdminEmail, role);
        return new AuthResponse(token, username, role);
    }

    public boolean updatePassword(String username, String currentPassword, String newPassword) {
        if (username == null) return false;
        String identifier = username.trim();

        Optional<AdminUser> adminOpt = adminUserRepository.findByUsername(identifier);
        if (adminOpt.isEmpty()) {
            adminOpt = adminUserRepository.findByEmail(identifier);
        }

        if (adminOpt.isPresent()) {
            AdminUser user = adminOpt.get();
            if (user.getPassword().equals(currentPassword) && defaultAdminEmail.equalsIgnoreCase(user.getEmail())) {
                user.setPassword(newPassword);
                adminUserRepository.save(user);
                return true;
            }
        } else if ((identifier.equalsIgnoreCase(defaultAdminUsername) || identifier.equalsIgnoreCase(defaultAdminEmail))
                && currentPassword.equals(defaultAdminPassword)) {
            AdminUser newUser = new AdminUser(defaultAdminUsername, newPassword, defaultAdminEmail);
            newUser.setRole("ROLE_ADMIN");
            adminUserRepository.save(newUser);
            return true;
        }
        return false;
    }

    private final java.util.Map<String, ResetTokenEntry> resetTokens = new java.util.concurrent.ConcurrentHashMap<>();

    private static class ResetTokenEntry {
        final String otp;
        final long expiresAt;
        final String email;

        ResetTokenEntry(String otp, long expiresAt, String email) {
            this.otp = otp;
            this.expiresAt = expiresAt;
            this.email = email;
        }
    }

    public java.util.Map<String, Object> generatePasswordResetOtp(String identifier) {
        if (identifier == null || identifier.trim().isEmpty()) {
            throw new RuntimeException("Administrator email or username is required.");
        }
        String cleanId = identifier.trim().toLowerCase();
        boolean isDesignatedAdmin = cleanId.equalsIgnoreCase(defaultAdminEmail) || cleanId.equalsIgnoreCase(defaultAdminUsername);

        Optional<AdminUser> userOpt = adminUserRepository.findByEmail(cleanId);
        if (userOpt.isEmpty()) {
            userOpt = adminUserRepository.findByUsername(cleanId);
        }

        if (!isDesignatedAdmin && userOpt.isEmpty()) {
            throw new RuntimeException("Access denied: Only the designated portfolio administrator (" + defaultAdminEmail + ") can request password recovery.");
        }

        int code = 100000 + new java.util.Random().nextInt(900000);
        String otp = String.valueOf(code);
        long expiresAt = System.currentTimeMillis() + (15 * 60 * 1000); // 15 mins

        resetTokens.put(defaultAdminEmail.toLowerCase(), new ResetTokenEntry(otp, expiresAt, defaultAdminEmail));
        resetTokens.put(defaultAdminUsername.toLowerCase(), new ResetTokenEntry(otp, expiresAt, defaultAdminEmail));
        if (userOpt.isPresent() && userOpt.get().getEmail() != null) {
            resetTokens.put(userOpt.get().getEmail().toLowerCase(), new ResetTokenEntry(otp, expiresAt, userOpt.get().getEmail()));
        }

        System.out.println("===================================================================");
        System.out.println("[ADMIN SECURITY NOTICE] Password Reset OTP for " + defaultAdminEmail + ": " + otp);
        System.out.println("Valid for 15 minutes. Enter this code on the Reset Password screen.");
        System.out.println("===================================================================");

        java.util.Map<String, Object> responseData = new java.util.HashMap<>();
        responseData.put("email", defaultAdminEmail);
        responseData.put("otp", otp);
        responseData.put("expiresInMinutes", 15);
        responseData.put("message", "A 6-digit verification code has been generated for " + defaultAdminEmail);
        return responseData;
    }

    public boolean resetPasswordWithOtp(String identifier, String otp, String newPassword) {
        if (identifier == null || otp == null || newPassword == null) {
            return false;
        }
        String cleanId = identifier.trim().toLowerCase();
        ResetTokenEntry entry = resetTokens.get(cleanId);
        if (entry == null && cleanId.equalsIgnoreCase(defaultAdminUsername)) {
            entry = resetTokens.get(defaultAdminEmail.toLowerCase());
        }

        if (entry == null) {
            throw new RuntimeException("No active reset request found for this account. Please request a new code.");
        }

        if (System.currentTimeMillis() > entry.expiresAt) {
            resetTokens.remove(cleanId);
            throw new RuntimeException("Verification code has expired. Please request a new code.");
        }

        if (!entry.otp.equals(otp.trim())) {
            throw new RuntimeException("Invalid verification code. Please check and try again.");
        }

        Optional<AdminUser> userOpt = adminUserRepository.findByEmail(defaultAdminEmail);
        if (userOpt.isEmpty()) {
            userOpt = adminUserRepository.findByUsername(defaultAdminUsername);
        }

        AdminUser adminUser;
        if (userOpt.isPresent()) {
            adminUser = userOpt.get();
            adminUser.setPassword(newPassword);
        } else {
            adminUser = new AdminUser(defaultAdminUsername, newPassword, defaultAdminEmail);
            adminUser.setRole("ROLE_ADMIN");
        }
        adminUserRepository.save(adminUser);

        resetTokens.remove(defaultAdminEmail.toLowerCase());
        resetTokens.remove(defaultAdminUsername.toLowerCase());
        resetTokens.remove(cleanId);

        System.out.println("[ADMIN SECURITY NOTICE] Administrator password successfully reset for " + defaultAdminEmail);
        return true;
    }
}
