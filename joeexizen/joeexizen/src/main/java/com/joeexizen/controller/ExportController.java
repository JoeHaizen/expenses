package com.joeexizen.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.joeexizen.model.Expense;
import com.joeexizen.repository.ExpenseRepository;
import com.joeexizen.service.ExcelService;

@RestController
@RequestMapping("/export")
public class ExportController {

    private final ExcelService excelService;
    private final ExpenseRepository repository;

    public ExportController(ExcelService excelService, ExpenseRepository repository) {
        this.excelService = excelService;
        this.repository = repository;
    }

    @GetMapping("/excel")
    public ResponseEntity<byte[]> exportExcel() {
        try {
            List<Expense> data = repository.findAll();
            byte[] excelContent = excelService.generateExcel(data);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename("export.xlsx").build());

            return new ResponseEntity<>(excelContent, headers, HttpStatus.OK);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

