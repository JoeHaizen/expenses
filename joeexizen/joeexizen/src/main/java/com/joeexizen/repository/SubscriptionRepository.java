package com.joeexizen.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.joeexizen.model.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    
    // SubscriptionRepository.java
@Query("SELECT SUM(s.amount) FROM Subscription s WHERE s.monthYearStart <= :monthYear AND (s.monthYearEnd IS NULL OR s.monthYearEnd >= :monthYear)")
Double getTotalSubscriptionsByMonth(@Param("monthYear") LocalDate monthYear);
}
