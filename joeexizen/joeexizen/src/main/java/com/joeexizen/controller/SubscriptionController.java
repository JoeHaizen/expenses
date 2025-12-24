package com.joeexizen.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joeexizen.model.Subscription;
import com.joeexizen.repository.SubscriptionRepository;
import com.joeexizen.service.SubscriptionService;


@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "http://127.0.0.1:5500") // ✅ autorise ton front local
public class SubscriptionController {

     private final SubscriptionService subscriptionService;
     private final SubscriptionRepository subscriptionRepository;

    public SubscriptionController(SubscriptionService subscriptionService, SubscriptionRepository subscriptionRepository) {
        this.subscriptionService = subscriptionService;
        this.subscriptionRepository = subscriptionRepository;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Subscription> getSubscriptionById(@PathVariable Long id) {
    return subscriptionRepository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}
    @GetMapping
    public List<Subscription> getAllSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

    @PostMapping
    public Subscription addSubscription(@RequestBody Subscription subscription) {
        return subscriptionService.addSubscription(subscription);
    }

    @PutMapping("/{id}")
    public Subscription updateSubscription(@PathVariable Long id, @RequestBody Subscription subscription) {
        return subscriptionService.updateSubscription(id, subscription);
    }

    @DeleteMapping("/{id}")
    public void deleteSubscription(@PathVariable Long id) {
        subscriptionService.deleteSubscription(id);
    }

    @GetMapping("/total/{monthYear}")
    public Double getTotalForMonth(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate monthYear) {
        return subscriptionService.getTotalForMonth(monthYear);
    }

}
