package com.lokesh.portfolio.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(length = 500)
    private String tagline;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String problemStatement;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String solution;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String architectureOverview;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String challenges;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String testing;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String futureImprovements;

    @Column(length = 1000)
    private String technologies;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String features;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String architectureDiagram;

    private String liveDemoUrl;
    private String githubUrl;
    private String imageUrl;

    @Column(nullable = false)
    private String status; // COMPLETED, IN_PROGRESS, PLANNED

    private Integer displayOrder = 0;
    private Boolean featured = false;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Project() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getProblemStatement() { return problemStatement; }
    public void setProblemStatement(String problemStatement) { this.problemStatement = problemStatement; }

    public String getSolution() { return solution; }
    public void setSolution(String solution) { this.solution = solution; }

    public String getArchitectureOverview() { return architectureOverview; }
    public void setArchitectureOverview(String architectureOverview) { this.architectureOverview = architectureOverview; }

    public String getChallenges() { return challenges; }
    public void setChallenges(String challenges) { this.challenges = challenges; }

    public String getTesting() { return testing; }
    public void setTesting(String testing) { this.testing = testing; }

    public String getFutureImprovements() { return futureImprovements; }
    public void setFutureImprovements(String futureImprovements) { this.futureImprovements = futureImprovements; }

    public String getTechnologies() { return technologies; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }

    public String getArchitectureDiagram() { return architectureDiagram; }
    public void setArchitectureDiagram(String architectureDiagram) { this.architectureDiagram = architectureDiagram; }

    public String getLiveDemoUrl() { return liveDemoUrl; }
    public void setLiveDemoUrl(String liveDemoUrl) { this.liveDemoUrl = liveDemoUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
