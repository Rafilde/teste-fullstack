package com.example.unimed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.unimed.model.Plan;
import com.example.unimed.repository.PlanRepository;

import java.util.List;

@RestController
@RequestMapping("/api/plans") 
public class PlanController {

    @Autowired
    private PlanRepository planRepository;

    @PostMapping
    public Plan createPlan(@RequestBody Plan plan) {
        return planRepository.save(plan);
    }
 
    @GetMapping
    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable("id") Long id, @RequestBody Plan planDetails) {
        return planRepository.findById(id)
                .map(existingPlan -> {
                    existingPlan.setName(planDetails.getName());
                    existingPlan.setValue(planDetails.getValue());
                    Plan updatedPlan = planRepository.save(existingPlan);
                    return ResponseEntity.ok(updatedPlan);
                })
                .orElse(ResponseEntity.notFound().build()); 
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable("id") Long id) {
        return planRepository.findById(id)
                .map(plan -> {
                    planRepository.delete(plan);
                    return ResponseEntity.ok().<Void>build(); 
                })
                .orElse(ResponseEntity.notFound().build()); 
    }
    
}
