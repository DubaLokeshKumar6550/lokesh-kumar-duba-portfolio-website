package com.lokesh.portfolio.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Component
public class AdminAuthInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${app.admin.email:dubalokeshkumar6550@gmail.com}")
    private String adminEmail;

    @Value("${app.admin.username:admin}")
    private String adminUsername;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 1. Allow CORS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String uri = request.getRequestURI();

        // 2. Public endpoints that never require authentication
        if (uri.endsWith("/api/health") || uri.endsWith("/api/auth/login") ||
            uri.endsWith("/api/auth/forgot-password") || uri.endsWith("/api/auth/reset-password") ||
            uri.endsWith("/api/contact")) {
            return true;
        }

        // 3. Reject any registration or privilege assignment attempts with 403 Forbidden
        if (uri.contains("/register") || uri.contains("/assign-role") || uri.contains("/self-register")) {
            sendJsonResponse(response, HttpServletResponse.SC_FORBIDDEN,
                    "Forbidden: Public administrator registration is permanently disabled. Admin privileges cannot be assigned.");
            return false;
        }

        // 4. Allow public GET requests (visitors browsing portfolio data without login)
        // Admin-only GET endpoints (e.g. /api/admin/messages) remain protected
        if ("GET".equalsIgnoreCase(request.getMethod()) && !uri.startsWith("/api/admin")) {
            return true;
        }

        // 5. All write operations (POST, PUT, PATCH, DELETE) and /api/admin/** endpoints require admin authorization
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            sendJsonResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized: Valid administrator authentication token is required.");
            return false;
        }

        String token = authHeader.substring(7).trim();
        if (!jwtUtil.validateToken(token)) {
            sendJsonResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized: Authentication token is invalid or has expired.");
            return false;
        }

        // 6. Verify Administrator Identity on the server
        String tokenEmail = jwtUtil.getEmailFromToken(token);
        String tokenUsername = jwtUtil.getUsernameFromToken(token);
        String tokenRole = jwtUtil.getRoleFromToken(token);

        boolean hasAdminRole = "ROLE_ADMIN".equals(tokenRole);
        boolean isAuthorizedEmail = tokenEmail != null && adminEmail.equalsIgnoreCase(tokenEmail.trim());
        boolean isAuthorizedUser = tokenUsername != null &&
                (adminUsername.equalsIgnoreCase(tokenUsername.trim()) || adminEmail.equalsIgnoreCase(tokenUsername.trim()));

        if (!hasAdminRole || (!isAuthorizedEmail && !isAuthorizedUser)) {
            sendJsonResponse(response, HttpServletResponse.SC_FORBIDDEN,
                    "Forbidden: Access denied. Only administrator account (" + adminEmail + ") can modify portfolio content.");
            return false;
        }

        request.setAttribute("authenticatedUser", tokenUsername != null ? tokenUsername : adminUsername);
        request.setAttribute("authenticatedEmail", tokenEmail != null ? tokenEmail : adminEmail);
        request.setAttribute("authenticatedRole", tokenRole);
        return true;
    }

    private void sendJsonResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        // Escape quotes if any in message
        String safeMessage = message.replace("\"", "\\\"");
        response.getWriter().write(String.format("{\"success\":false,\"message\":\"%s\"}", safeMessage));
    }
}
