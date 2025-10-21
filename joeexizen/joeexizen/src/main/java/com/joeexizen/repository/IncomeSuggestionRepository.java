package com.joeexizen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joeexizen.model.IncomeSuggestion;

public interface IncomeSuggestionRepository extends JpaRepository<IncomeSuggestion, Long> {

}
