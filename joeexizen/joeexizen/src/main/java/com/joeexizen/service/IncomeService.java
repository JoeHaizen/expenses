package com.joeexizen.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.joeexizen.model.Income;
import com.joeexizen.repository.IncomeRepository;


@Service
public class IncomeService {
    
    private final IncomeRepository incomeRepository;

    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    public List<Income> getAllIncomes(){
        return incomeRepository.findAll();
    }

    public Income addIncome(Income income){
        return incomeRepository.save(income);
    }
    public Income updateIncome(Long id, Income updatedIncome) {
        return incomeRepository.findById(id)
                .map(income -> {
                    income.setLabel(updatedIncome.getLabel());
                    income.setAmount(updatedIncome.getAmount());
                    income.setDescription(updatedIncome.getDescription());
                    income.setMonthYear(updatedIncome.getMonthYear());
                    return incomeRepository.save(income);
                })
                .orElseThrow(() -> new RuntimeException("Income not found"));
    }
    public void deleteIncome(Long id){
        incomeRepository.deleteById(id);
    }
}