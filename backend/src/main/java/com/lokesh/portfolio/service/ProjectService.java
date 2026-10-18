package com.lokesh.portfolio.service;

import com.lokesh.portfolio.model.Project;
import com.lokesh.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Optional<Project> getProjectBySlug(String slug) {
        return projectRepository.findBySlug(slug);
    }

    public Project createProject(Project project) {
        if (project.getSlug() == null || project.getSlug().trim().isEmpty()) {
            project.setSlug(generateSlug(project.getTitle()));
        }
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updated) {
        return projectRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            if (updated.getSlug() != null && !updated.getSlug().trim().isEmpty()) {
                existing.setSlug(updated.getSlug());
            }
            existing.setTagline(updated.getTagline());
            existing.setDescription(updated.getDescription());
            existing.setProblemStatement(updated.getProblemStatement());
            existing.setSolution(updated.getSolution());
            existing.setArchitectureOverview(updated.getArchitectureOverview());
            existing.setChallenges(updated.getChallenges());
            existing.setTesting(updated.getTesting());
            existing.setFutureImprovements(updated.getFutureImprovements());
            existing.setTechnologies(updated.getTechnologies());
            existing.setFeatures(updated.getFeatures());
            existing.setArchitectureDiagram(updated.getArchitectureDiagram());
            existing.setLiveDemoUrl(updated.getLiveDemoUrl());
            existing.setGithubUrl(updated.getGithubUrl());
            existing.setImageUrl(updated.getImageUrl());
            existing.setStatus(updated.getStatus());
            existing.setDisplayOrder(updated.getDisplayOrder());
            existing.setFeatured(updated.getFeatured());
            return projectRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    private String generateSlug(String title) {
        if (title == null) return "project-" + System.currentTimeMillis();
        return title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }
}
