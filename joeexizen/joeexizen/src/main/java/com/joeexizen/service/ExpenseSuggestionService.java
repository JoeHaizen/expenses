package com.joeexizen.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.joeexizen.model.ExpenseSuggestion;
import com.joeexizen.repository.ExpenseSuggestionRepository;


@Service
public class ExpenseSuggestionService {

    private final ExpenseSuggestionRepository expenseSuggestionRepository;

    public ExpenseSuggestionService(ExpenseSuggestionRepository expenseSuggestionRepository) {
        this.expenseSuggestionRepository = expenseSuggestionRepository;
    }

    public List<ExpenseSuggestion> getAllExpenseSuggestions(){
        return expenseSuggestionRepository.findAll();
    }

    public ExpenseSuggestion addExpenseSuggestion(ExpenseSuggestion expenseSuggestion){
        return expenseSuggestionRepository.save(expenseSuggestion);
    }
    public ExpenseSuggestion updateExpenseSuggestion(Long id, ExpenseSuggestion updatedExpenseSuggestion) {
        return expenseSuggestionRepository.findById(id)
                .map(expenseSuggestion -> {
                    expenseSuggestion.setContent(updatedExpenseSuggestion.getContent());
                    expenseSuggestion.setSuggestion(updatedExpenseSuggestion.getSuggestion());
                    expenseSuggestion.setMonthYear(updatedExpenseSuggestion.getMonthYear());
                    return expenseSuggestionRepository.save(expenseSuggestion);
                })
                .orElseThrow(() -> new RuntimeException("Expense not found"));
    }
    public void deleteExpenseSuggestion(Long id){
        expenseSuggestionRepository.deleteById(id);
    }
}