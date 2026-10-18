package com.lokesh.portfolio.controller;

import com.lokesh.portfolio.dto.ApiResponse;
import com.lokesh.portfolio.model.Skill;
import com.lokesh.portfolio.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<List<Skill>>> getAllSkills(
            @RequestParam(required = false) String category) {
        List<Skill> skills = (category != null && !category.isEmpty())
                ? skillService.getSkillsByCategory(category)
                : skillService.getAllSkills();
        return ResponseEntity.ok(ApiResponse.ok(skills));
    }

    @PostMapping("/admin/skills")
    public ResponseEntity<ApiResponse<Skill>> createSkill(@RequestBody Skill skill) {
        Skill created = skillService.createSkill(skill);
        return ResponseEntity.ok(ApiResponse.ok("Skill created successfully", created));
    }

    @PutMapping("/admin/skills/{id}")
    public ResponseEntity<ApiResponse<Skill>> updateSkill(@PathVariable Long id, @RequestBody Skill skill) {
        try {
            Skill updated = skillService.updateSkill(id, skill);
            return ResponseEntity.ok(ApiResponse.ok("Skill updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/admin/skills/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok(ApiResponse.ok("Skill deleted successfully", null));
    }
}
