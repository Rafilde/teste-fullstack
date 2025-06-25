package com.example.unimed.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.unimed.model.Beneficiary;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {}
