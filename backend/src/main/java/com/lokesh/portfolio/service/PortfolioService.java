package com.lokesh.portfolio.service;

import com.lokesh.portfolio.model.*;
import com.lokesh.portfolio.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private CertificationRepository certificationRepository;

    // Profile
    public Optional<Profile> getProfile() {
        return profileRepository.findFirstByOrderByIdAsc();
    }

    public Profile saveOrUpdateProfile(Profile profile) {
        Optional<Profile> existing = profileRepository.findFirstByOrderByIdAsc();
        if (existing.isPresent()) {
            Profile p = existing.get();
            p.setName(profile.getName());
            p.setHeadline(profile.getHeadline());
            p.setSummary(profile.getSummary());
            p.setBio(profile.getBio());
            p.setLocation(profile.getLocation());
            p.setEmail(profile.getEmail());
            p.setPhone(profile.getPhone());
            p.setGithubUrl(profile.getGithubUrl());
            p.setLinkedinUrl(profile.getLinkedinUrl());
            p.setPhotoUrl(profile.getPhotoUrl());
            p.setResumeUrl(profile.getResumeUrl());
            p.setAvailableForWork(profile.getAvailableForWork());
            return profileRepository.save(p);
        } else {
            return profileRepository.save(profile);
        }
    }

    // Experience
    public List<Experience> getAllExperience() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Experience createExperience(Experience exp) {
        return experienceRepository.save(exp);
    }

    public Experience updateExperience(Long id, Experience updated) {
        return experienceRepository.findById(id).map(e -> {
            e.setRole(updated.getRole());
            e.setCompany(updated.getCompany());
            e.setLocation(updated.getLocation());
            e.setPeriod(updated.getPeriod());
            e.setDescription(updated.getDescription());
            e.setHighlights(updated.getHighlights());
            e.setSkillsUsed(updated.getSkillsUsed());
            e.setDisplayOrder(updated.getDisplayOrder());
            return experienceRepository.save(e);
        }).orElseThrow(() -> new RuntimeException("Experience entry not found: " + id));
    }

    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }

    // Education
    public List<Education> getAllEducation() {
        return educationRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Education createEducation(Education edu) {
        return educationRepository.save(edu);
    }

    public Education updateEducation(Long id, Education updated) {
        return educationRepository.findById(id).map(e -> {
            e.setDegree(updated.getDegree());
            e.setInstitution(updated.getInstitution());
            e.setLocation(updated.getLocation());
            e.setPeriod(updated.getPeriod());
            e.setGrade(updated.getGrade());
            e.setDescription(updated.getDescription());
            e.setDisplayOrder(updated.getDisplayOrder());
            return educationRepository.save(e);
        }).orElseThrow(() -> new RuntimeException("Education entry not found: " + id));
    }

    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);
    }

    // Certification
    public List<Certification> getAllCertifications() {
        return certificationRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Certification createCertification(Certification cert) {
        return certificationRepository.save(cert);
    }

    public Certification updateCertification(Long id, Certification updated) {
        return certificationRepository.findById(id).map(c -> {
            c.setTitle(updated.getTitle());
            c.setIssuer(updated.getIssuer());
            c.setIssueYear(updated.getIssueYear());
            c.setCredentialUrl(updated.getCredentialUrl());
            c.setBadgeIcon(updated.getBadgeIcon());
            c.setDisplayOrder(updated.getDisplayOrder());
            return certificationRepository.save(c);
        }).orElseThrow(() -> new RuntimeException("Certification not found: " + id));
    }

    public void deleteCertification(Long id) {
        certificationRepository.deleteById(id);
    }
}
