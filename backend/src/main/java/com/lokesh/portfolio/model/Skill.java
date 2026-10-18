package com.lokesh.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // Languages, Backend & Frameworks, Frontend Development, Databases, Tools & Practices, Cloud

    private String level; // Core Strength, Proficient, Advanced, Fundamentals
    private String icon;
    private Integer displayOrder = 0;
    private Boolean highlight = false;

    public Skill() {}

    public Skill(String name, String category, String level, String icon, Integer displayOrder, Boolean highlight) {
        this.name = name;
        this.category = category;
        this.level = level;
        this.icon = icon;
        this.displayOrder = displayOrder;
        this.highlight = highlight;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public Boolean getHighlight() { return highlight; }
    public void setHighlight(Boolean highlight) { this.highlight = highlight; }
}
