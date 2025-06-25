package com.example.unimed.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.unimed.model.Plan;

public interface PlanRepository extends JpaRepository<Plan, Long> {}
