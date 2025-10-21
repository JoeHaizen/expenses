package com.joeexizen.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joeexizen.model.ExpenseSuggestion;
import com.joeexizen.service.ExpenseSuggestionService;


@RestController
@RequestMapping("/api/expenses-suggestions")
@CrossOrigin(origins = "http://127.0.0.1:5500") // ✅ autorise ton front local
public class ExpenseSuggestionController {

     private final ExpenseSuggestionService expenseSuggestionService;

    public ExpenseSuggestionController(ExpenseSuggestionService expenseSuggestionService) {
        this.expenseSuggestionService = expenseSuggestionService;
    }

    @GetMapping
    public List<ExpenseSuggestion> getAllExpenseSuggestions() {
        return expenseSuggestionService.getAllExpenseSuggestions();
    }

    @PostMapping
    public ExpenseSuggestion addExpenseSuggestion(@RequestBody ExpenseSuggestion expenseSuggestion) {
        return expenseSuggestionService.addExpenseSuggestion(expenseSuggestion);
    }

    @PutMapping("/{id}")
    public ExpenseSuggestion updateExpenseSuggestion(@PathVariable Long id, @RequestBody ExpenseSuggestion expenseSuggestion) {
        return expenseSuggestionService.updateExpenseSuggestion(id, expenseSuggestion);
    }

    @DeleteMapping("/{id}")
    public void deleteExpenseSuggestion(@PathVariable Long id) {
        expenseSuggestionService.deleteExpenseSuggestion(id);
    }

}
