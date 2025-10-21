package com.joeexizen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joeexizen.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    
}
