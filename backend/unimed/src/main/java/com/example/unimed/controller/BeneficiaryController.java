package com.example.unimed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.unimed.model.Beneficiary;
import com.example.unimed.repository.BeneficiaryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiaries") 
public class BeneficiaryController {

    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @PostMapping
    public Beneficiary createBeneficiary(@RequestBody Beneficiary beneficiary) {
        return beneficiaryRepository.save(beneficiary);
    }

    @GetMapping
    public List<Beneficiary> getAllBeneficiaries() {
        return beneficiaryRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Beneficiary> getBeneficiaryById(@PathVariable("id") Long id) {
        return beneficiaryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Beneficiary> updateBeneficiary(@PathVariable("id") Long id, @RequestBody Beneficiary beneficiaryDetails) {
        return beneficiaryRepository.findById(id)
                .map(existingBeneficiary -> {
                    existingBeneficiary.setName(beneficiaryDetails.getName());
                    existingBeneficiary.setCpf(beneficiaryDetails.getCpf());
                    existingBeneficiary.setEmail(beneficiaryDetails.getEmail());
                    existingBeneficiary.setAge(beneficiaryDetails.getAge());
                    existingBeneficiary.setPlan(beneficiaryDetails.getPlan());
                    
                    Beneficiary updatedBeneficiary = beneficiaryRepository.save(existingBeneficiary);
                    return ResponseEntity.ok(updatedBeneficiary);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeneficiary(@PathVariable("id") Long id) {
        return beneficiaryRepository.findById(id)
                .map(beneficiary -> {
                    beneficiaryRepository.delete(beneficiary);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
