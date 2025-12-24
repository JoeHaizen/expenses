package com.joeexizen.service;

import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import com.joeexizen.model.Expense;

@Service
public class ExcelService {

    public byte[] generateExcel(List<Expense> data) throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            XSSFSheet sheet = workbook.createSheet("Données");
            
            int rowNum = 0;
            XSSFRow header = sheet.createRow(rowNum++);
            header.createCell(0).setCellValue("ID");
            header.createCell(1).setCellValue("Label");
            header.createCell(2).setCellValue("Description");
            header.createCell(3).setCellValue("Amount");
            header.createCell(4).setCellValue("MonthYear");
            // autres colonnes...

            for (Expense item : data) {
                XSSFRow row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(item.getId());
                row.createCell(1).setCellValue(item.getLabel());
                row.createCell(2).setCellValue(item.getDescription());
                row.createCell(3).setCellValue(item.getAmount());
                row.createCell(4).setCellValue(item.getMonthYear());
                // autres colonnes...
            }

            try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
                workbook.write(baos);
                return baos.toByteArray();
            }
        }
    }
}

