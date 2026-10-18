package com.lokesh.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "certifications")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String issuer;

    private String issueYear;
    private String credentialUrl;
    private String badgeIcon;
    private Integer displayOrder = 0;

    public Certification() {}

    public Certification(String title, String issuer, String issueYear, String credentialUrl, String badgeIcon, Integer displayOrder) {
        this.title = title;
        this.issuer = issuer;
        this.issueYear = issueYear;
        this.credentialUrl = credentialUrl;
        this.badgeIcon = badgeIcon;
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }

    public String getIssueYear() { return issueYear; }
    public void setIssueYear(String issueYear) { this.issueYear = issueYear; }

    public String getCredentialUrl() { return credentialUrl; }
    public void setCredentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; }

    public String getBadgeIcon() { return badgeIcon; }
    public void setBadgeIcon(String badgeIcon) { this.badgeIcon = badgeIcon; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
