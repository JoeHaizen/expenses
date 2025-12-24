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

public class IncomeSuggestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String suggestion; 

     @DateTimeFormat(pattern = "yyyy-MM")
    private LocalDate monthYear;
    
    public IncomeSuggestion(Long id, String content, String suggestion, LocalDate monthYear) {
        this.id = id;
        this.content = content;
        this.suggestion = suggestion;
        this.monthYear = monthYear;
    }
}
