package com.lokesh.portfolio.service;

import com.lokesh.portfolio.model.Skill;
import com.lokesh.portfolio.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAllByOrderByDisplayOrderAsc();
    }

    public List<Skill> getSkillsByCategory(String category) {
        return skillRepository.findByCategoryOrderByDisplayOrderAsc(category);
    }

    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill updateSkill(Long id, Skill updated) {
        return skillRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setCategory(updated.getCategory());
            existing.setLevel(updated.getLevel());
            existing.setIcon(updated.getIcon());
            existing.setDisplayOrder(updated.getDisplayOrder());
            existing.setHighlight(updated.getHighlight());
            return skillRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));
    }

    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}
