package com.lokesh.portfolio.controller;

import com.lokesh.portfolio.dto.ApiResponse;
import com.lokesh.portfolio.model.*;
import com.lokesh.portfolio.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
