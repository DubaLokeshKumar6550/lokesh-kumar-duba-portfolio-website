package com.lokesh.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "experience")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String company;

    private String location;
    private String period;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String highlights; // JSON or newline separated

    private String skillsUsed;
    private Integer displayOrder = 0;

    public Experience() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getHighlights() { return highlights; }
    public void setHighlights(String highlights) { this.highlights = highlights; }

    public String getSkillsUsed() { return skillsUsed; }
    public void setSkillsUsed(String skillsUsed) { this.skillsUsed = skillsUsed; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
