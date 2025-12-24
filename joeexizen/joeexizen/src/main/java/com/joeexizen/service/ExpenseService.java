package com.joeexizen.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.joeexizen.model.Expense;
import com.joeexizen.repository.ExpenseRepository;


@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses(){
        return expenseRepository.findAll();
    }

    public Expense addExpense(Expense expense){
        return expenseRepository.save(expense);
    }
    public Expense updateExpense(Long id, Expense updatedExpense) {
        return expenseRepository.findById(id)
                .map(expense -> {
                    expense.setLabel(updatedExpense.getLabel());
                    expense.setAmount(updatedExpense.getAmount());
                    expense.setDescription(updatedExpense.getDescription());
                    expense.setMonthYear(updatedExpense.getMonthYear());
                    return expenseRepository.save(expense);
                })
                .orElseThrow(() -> new RuntimeException("Expense not found"));
    }
    public void deleteExpense(Long id){
        expenseRepository.deleteById(id);
    }
}