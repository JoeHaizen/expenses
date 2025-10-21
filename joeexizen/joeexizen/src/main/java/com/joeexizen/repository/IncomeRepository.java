package com.joeexizen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joeexizen.model.Income;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    
}
