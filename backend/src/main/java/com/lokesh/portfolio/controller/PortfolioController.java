package com.lokesh.portfolio.controller;

import com.lokesh.portfolio.dto.ApiResponse;
import com.lokesh.portfolio.model.*;
import com.lokesh.portfolio.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    // --- Profile ---
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Profile>> getProfile() {
        return portfolioService.getProfile()
                .map(p -> ResponseEntity.ok(ApiResponse.ok(p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/admin/profile")
    public ResponseEntity<ApiResponse<Profile>> updateProfile(@RequestBody Profile profile) {
        Profile saved = portfolioService.saveOrUpdateProfile(profile);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", saved));
    }

    // --- Experience ---
    @GetMapping("/experience")
    public ResponseEntity<ApiResponse<List<Experience>>> getExperience() {
        return ResponseEntity.ok(ApiResponse.ok(portfolioService.getAllExperience()));
    }

    @PostMapping("/admin/experience")
    public ResponseEntity<ApiResponse<Experience>> createExperience(@RequestBody Experience exp) {
        return ResponseEntity.ok(ApiResponse.ok("Experience added successfully", portfolioService.createExperience(exp)));
    }

    @PutMapping("/admin/experience/{id}")
    public ResponseEntity<ApiResponse<Experience>> updateExperience(@PathVariable Long id, @RequestBody Experience exp) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Experience updated successfully", portfolioService.updateExperience(id, exp)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/admin/experience/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteExperience(@PathVariable Long id) {
        portfolioService.deleteExperience(id);
        return ResponseEntity.ok(ApiResponse.ok("Experience deleted successfully", null));
    }

    // --- Education ---
    @GetMapping("/education")
    public ResponseEntity<ApiResponse<List<Education>>> getEducation() {
        return ResponseEntity.ok(ApiResponse.ok(portfolioService.getAllEducation()));
    }

    @PostMapping("/admin/education")
    public ResponseEntity<ApiResponse<Education>> createEducation(@RequestBody Education edu) {
        return ResponseEntity.ok(ApiResponse.ok("Education added successfully", portfolioService.createEducation(edu)));
    }

    @PutMapping("/admin/education/{id}")
    public ResponseEntity<ApiResponse<Education>> updateEducation(@PathVariable Long id, @RequestBody Education edu) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Education updated successfully", portfolioService.updateEducation(id, edu)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/admin/education/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEducation(@PathVariable Long id) {
        portfolioService.deleteEducation(id);
        return ResponseEntity.ok(ApiResponse.ok("Education deleted successfully", null));
    }

    // --- Certifications ---
    @GetMapping("/certifications")
    public ResponseEntity<ApiResponse<List<Certification>>> getCertifications() {
        return ResponseEntity.ok(ApiResponse.ok(portfolioService.getAllCertifications()));
    }

    @PostMapping("/admin/certifications")
    public ResponseEntity<ApiResponse<Certification>> createCertification(@RequestBody Certification cert) {
        return ResponseEntity.ok(ApiResponse.ok("Certification added successfully", portfolioService.createCertification(cert)));
    }

    @PutMapping("/admin/certifications/{id}")
    public ResponseEntity<ApiResponse<Certification>> updateCertification(@PathVariable Long id, @RequestBody Certification cert) {
        try {
            return ResponseEntity.ok(ApiResponse.ok("Certification updated successfully", portfolioService.updateCertification(id, cert)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/admin/certifications/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCertification(@PathVariable Long id) {
        portfolioService.deleteCertification(id);
        return ResponseEntity.ok(ApiResponse.ok("Certification deleted successfully", null));
    }

    // --- Direct File Upload for Profile Photo and Resume ---
    @PostMapping("/admin/upload")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "type", required = false) String type) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Please select a file to upload."));
        }
        try {
            String originalName = file.getOriginalFilename();
            String extension = "";
            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf(".")).toLowerCase();
            }

            String targetFilename;
            if ("photo".equalsIgnoreCase(type)) {
                targetFilename = "lokesh-photo" + (extension.isEmpty() ? ".jpg" : extension);
            } else if ("resume".equalsIgnoreCase(type)) {
                targetFilename = "Duba_Lokesh_Kumar_Resume" + (extension.isEmpty() ? ".pdf" : extension);
            } else {
                targetFilename = System.currentTimeMillis() + "_" + (originalName != null ? originalName.replaceAll("[^a-zA-Z0-9._-]", "_") : "file");
            }

            java.nio.file.Path[] targetDirs = new java.nio.file.Path[] {
                java.nio.file.Paths.get("..", "frontend", "public"),
                java.nio.file.Paths.get("..", "public"),
                java.nio.file.Paths.get("..", "frontend", "dist")
            };

            byte[] bytes = file.getBytes();
            for (java.nio.file.Path dir : targetDirs) {
                try {
                    if (java.nio.file.Files.exists(dir)) {
                        java.nio.file.Path destination = dir.resolve(targetFilename);
                        java.nio.file.Files.write(destination, bytes,
                                java.nio.file.StandardOpenOption.CREATE,
                                java.nio.file.StandardOpenOption.TRUNCATE_EXISTING);
                    }
                } catch (Exception ex) {
                    System.err.println("Could not copy uploaded file to " + dir + ": " + ex.getMessage());
                }
            }

            String publicUrl = "/" + targetFilename;
            Map<String, String> data = new HashMap<>();
            data.put("url", publicUrl);
            data.put("filename", targetFilename);
            data.put("originalName", originalName);

            // Immediately update the profile in the database
            portfolioService.getProfile().ifPresent(p -> {
                if ("photo".equalsIgnoreCase(type)) {
                    p.setPhotoUrl(publicUrl);
                    portfolioService.saveOrUpdateProfile(p);
                } else if ("resume".equalsIgnoreCase(type)) {
                    p.setResumeUrl(publicUrl);
                    portfolioService.saveOrUpdateProfile(p);
                }
            });

            return ResponseEntity.ok(ApiResponse.ok("File uploaded successfully and saved to portfolio!", data));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to process file upload: " + e.getMessage()));
        }
    }
}
