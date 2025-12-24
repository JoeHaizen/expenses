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

import com.joeexizen.model.IncomeSuggestion;
import com.joeexizen.service.IncomeSuggestionService;
@RestController
@RequestMapping("/api/incomes-suggestions")
@CrossOrigin(origins = "http://127.0.0.1:5500") // ✅ autorise ton front local
public class IncomeSuggestionController {

     private final IncomeSuggestionService incomeSuggestionService;

    public IncomeSuggestionController(IncomeSuggestionService incomeSuggestionService) {
        this.incomeSuggestionService = incomeSuggestionService;
    }

    @GetMapping
    public List<IncomeSuggestion> getAllIncomesSuggestions() {
        return incomeSuggestionService.getAllIncomesSuggestions();
    }

    @PostMapping
    public IncomeSuggestion addIncomeSuggestion(@RequestBody IncomeSuggestion incomeSuggestion) {
        return incomeSuggestionService.addIncomeSuggestion(incomeSuggestion);
    }

    @PutMapping("/{id}")
    public IncomeSuggestion updateIncomeSuggestion(@PathVariable Long id, @RequestBody IncomeSuggestion incomeSuggestion) {
        return incomeSuggestionService.updateIncomeSuggestion(id, incomeSuggestion);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable Long id) {
        incomeSuggestionService.deleteIncomeSuggestion(id);
    }

}
