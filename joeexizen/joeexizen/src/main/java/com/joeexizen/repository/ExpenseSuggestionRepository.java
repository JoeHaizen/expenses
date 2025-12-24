package com.joeexizen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joeexizen.model.ExpenseSuggestion;

public interface ExpenseSuggestionRepository extends JpaRepository<ExpenseSuggestion, Long> {
    
}
