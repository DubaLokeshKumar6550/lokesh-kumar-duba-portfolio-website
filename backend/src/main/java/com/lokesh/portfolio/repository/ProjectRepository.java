package com.lokesh.portfolio.repository;

import com.lokesh.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findBySlug(String slug);
    List<Project> findAllByOrderByDisplayOrderAscCreatedAtDesc();
    List<Project> findByStatus(String status);
}
