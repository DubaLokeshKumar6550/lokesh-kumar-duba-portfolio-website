package com.lokesh.portfolio.controller;

import com.lokesh.portfolio.dto.ApiResponse;
import com.lokesh.portfolio.model.Project;
import com.lokesh.portfolio.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // Public endpoints
    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<Project>>> getAllProjects() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getAllProjects()));
    }

    @GetMapping("/projects/{slug}")
    public ResponseEntity<ApiResponse<Project>> getProjectBySlug(@PathVariable String slug) {
        return projectService.getProjectBySlug(slug)
                .map(p -> ResponseEntity.ok(ApiResponse.ok(p)))
                .orElseGet(() -> {
                    // Try by ID fallback
                    try {
                        Long id = Long.parseLong(slug);
                        return projectService.getProjectById(id)
                                .map(p -> ResponseEntity.ok(ApiResponse.ok(p)))
                                .orElse(ResponseEntity.notFound().build());
                    } catch (NumberFormatException e) {
                        return ResponseEntity.notFound().build();
                    }
                });
    }

    // Protected Admin endpoints
    @PostMapping("/admin/projects")
    public ResponseEntity<ApiResponse<Project>> createProject(@RequestBody Project project) {
        Project created = projectService.createProject(project);
        return ResponseEntity.ok(ApiResponse.ok("Project created successfully", created));
    }

    @PutMapping("/admin/projects/{id}")
    public ResponseEntity<ApiResponse<Project>> updateProject(@PathVariable Long id, @RequestBody Project project) {
        try {
            Project updated = projectService.updateProject(id, project);
            return ResponseEntity.ok(ApiResponse.ok("Project updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/admin/projects/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.ok("Project deleted successfully", null));
    }
}
