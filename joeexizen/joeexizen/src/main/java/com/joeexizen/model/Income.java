package com.joeexizen.model;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data 
@NoArgsConstructor

public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;
    private String description;
    private Double amount;
    
    @DateTimeFormat(pattern = "yyyy-MM")
    private LocalDate monthYear;

    public Income(String label, String description, Double amount, LocalDate monthYear) {
        this.label = label;
        this.description = description;
        this.amount = amount;
        this.monthYear = monthYear;
    }

}
