package com.lokesh.portfolio;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lokesh.portfolio.dto.AuthRequest;
import com.lokesh.portfolio.model.ContactMessage;
import com.lokesh.portfolio.model.Profile;
import com.lokesh.portfolio.model.Project;
import com.lokesh.portfolio.model.Skill;
import com.lokesh.portfolio.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
public class SecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    private String validAdminToken;
    private String nonAdminToken;
    private String invalidRoleToken;

    @BeforeEach
    void setUp() {
        // Legitimate administrator token for Duba Lokesh Kumar
        validAdminToken = jwtUtil.generateToken("admin", "dubalokeshkumar6550@gmail.com", "ROLE_ADMIN");

        // Token with non-admin email
        nonAdminToken = jwtUtil.generateToken("hacker", "attacker@external.com", "ROLE_ADMIN");

        // Token with admin email but non-admin role
        invalidRoleToken = jwtUtil.generateToken("admin", "dubalokeshkumar6550@gmail.com", "ROLE_USER");
    }

    // ==========================================
    // 1. PUBLIC GET ENDPOINTS (Visitors can browse without login)
    // ==========================================

    @Test
    @DisplayName("Public can view projects without authentication")
    void testPublicGetProjects() throws Exception {
        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Public can view profile without authentication")
    void testPublicGetProfile() throws Exception {
        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Public can view skills without authentication")
    void testPublicGetSkills() throws Exception {
        mockMvc.perform(get("/api/skills"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Public can view experience without authentication")
    void testPublicGetExperience() throws Exception {
        mockMvc.perform(get("/api/experience"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Public can view education without authentication")
    void testPublicGetEducation() throws Exception {
        mockMvc.perform(get("/api/education"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Public can view certifications without authentication")
    void testPublicGetCertifications() throws Exception {
        mockMvc.perform(get("/api/certifications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Public can check health without authentication")
    void testPublicGetHealth() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Public visitors can submit contact messages without admin login")
    void testPublicSubmitContactMessage() throws Exception {
        ContactMessage msg = new ContactMessage("Tech Recruiter", "recruiter@example.com", "Job Opportunity", "Hello Lokesh!");
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(msg)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    // ==========================================
    // 2. UNAUTHENTICATED WRITE REJECTION (401 Unauthorized)
    // ==========================================

    @Test
    @DisplayName("Anonymous creation of projects rejected with 401")
    void testAnonymousCreateProjectRejected() throws Exception {
        Project p = new Project();
        p.setTitle("Malicious Project");
        p.setStatus("COMPLETED");

        mockMvc.perform(post("/api/admin/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Anonymous update of profile rejected with 401")
    void testAnonymousUpdateProfileRejected() throws Exception {
        Profile profile = new Profile();
        profile.setName("Hacked Profile");

        mockMvc.perform(put("/api/admin/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(profile)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Anonymous skill creation rejected with 401")
    void testAnonymousCreateSkillRejected() throws Exception {
        Skill skill = new Skill("Hacking", "Tools", "Basic", "Code", 99, false);

        mockMvc.perform(post("/api/admin/skills")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(skill)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Anonymous reading of admin contact messages rejected with 401")
    void testAnonymousGetMessagesRejected() throws Exception {
        mockMvc.perform(get("/api/admin/messages"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Anonymous password change rejected with 401")
    void testAnonymousChangePasswordRejected() throws Exception {
        mockMvc.perform(post("/api/auth/change-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"admin\",\"currentPassword\":\"123\",\"newPassword\":\"456\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    // ==========================================
    // 3. UNAUTHORIZED NON-ADMIN USER (403 Forbidden)
    // ==========================================

    @Test
    @DisplayName("Non-admin user token attempting project modification rejected with 403 Forbidden")
    void testNonAdminProjectCreateRejected() throws Exception {
        Project p = new Project();
        p.setTitle("Unauthorized Project");
        p.setStatus("COMPLETED");

        mockMvc.perform(post("/api/admin/projects")
                        .header("Authorization", "Bearer " + nonAdminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Token with invalid role attempting profile update rejected with 403 Forbidden")
    void testInvalidRoleProfileUpdateRejected() throws Exception {
        Profile profile = new Profile();
        profile.setName("Unauthorized Name");

        mockMvc.perform(put("/api/admin/profile")
                        .header("Authorization", "Bearer " + invalidRoleToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(profile)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("Public administrator registration is disabled and rejected with 403 Forbidden")
    void testRegistrationDisabled() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"newadmin\",\"password\":\"password\"}"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    // ==========================================
    // 4. AUTHORIZED ADMINISTRATOR ACCESS (200 OK)
    // ==========================================

    @Test
    @DisplayName("Administrator can authenticate using email dubalokeshkumar6550@gmail.com")
    void testAdminEmailLoginSuccess() throws Exception {
        AuthRequest request = new AuthRequest("dubalokeshkumar6550@gmail.com", "AdminPassword@2026");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").isNotEmpty());
    }

    @Test
    @DisplayName("Administrator can authenticate using username admin")
    void testAdminUsernameLoginSuccess() throws Exception {
        AuthRequest request = new AuthRequest("admin", "AdminPassword@2026");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").isNotEmpty());
    }

    @Test
    @DisplayName("Authorized administrator can create, publish, and reorder projects")
    void testAdminCanCreateProject() throws Exception {
        Project p = new Project();
        p.setTitle("Hospital Management System");
        p.setTagline("Secure hospital records portal");
        p.setStatus("PLANNED");
        p.setDisplayOrder(5);

        mockMvc.perform(post("/api/admin/projects")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Hospital Management System"));
    }

    @Test
    @DisplayName("Authorized administrator can update skills")
    void testAdminCanCreateSkill() throws Exception {
        Skill skill = new Skill("Docker & Kubernetes", "Cloud", "Proficient", "Boxes", 35, true);

        mockMvc.perform(post("/api/admin/skills")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(skill)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Docker & Kubernetes"));
    }

    @Test
    @DisplayName("Authorized administrator can access admin messages inbox")
    void testAdminCanGetMessages() throws Exception {
        mockMvc.perform(get("/api/admin/messages")
                        .header("Authorization", "Bearer " + validAdminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
