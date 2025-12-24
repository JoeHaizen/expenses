package com.joeexizen.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.joeexizen.model.IncomeSuggestion;
import com.joeexizen.repository.IncomeSuggestionRepository;


@Service
public class IncomeSuggestionService {
    
    private final IncomeSuggestionRepository incomeSuggestionRepository;

    public IncomeSuggestionService(IncomeSuggestionRepository incomeSuggestionRepository) {
        this.incomeSuggestionRepository = incomeSuggestionRepository;
    }

    public List<IncomeSuggestion> getAllIncomesSuggestions(){
        return incomeSuggestionRepository.findAll();
    }

    public IncomeSuggestion addIncomeSuggestion(IncomeSuggestion incomeSuggestion){
        return incomeSuggestionRepository.save(incomeSuggestion);
    }
    public IncomeSuggestion updateIncomeSuggestion(Long id, IncomeSuggestion updatedIncomeSuggestion) {
        return incomeSuggestionRepository.findById(id)
                .map(incomeSuggestion -> {
                    incomeSuggestion.setContent(updatedIncomeSuggestion.getContent());
                    incomeSuggestion.setSuggestion(updatedIncomeSuggestion.getSuggestion());
                    incomeSuggestion.setMonthYear(updatedIncomeSuggestion.getMonthYear());
                    return incomeSuggestionRepository.save(incomeSuggestion);
                })
                .orElseThrow(() -> new RuntimeException("Income not found"));
    }
    public void deleteIncomeSuggestion(Long id){
        incomeSuggestionRepository.deleteById(id);
    }
}