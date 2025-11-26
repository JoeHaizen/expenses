package com.joeexizen.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.joeexizen.model.Subscription;
import com.joeexizen.repository.SubscriptionRepository;


@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public List<Subscription> getAllSubscriptions(){
        return subscriptionRepository.findAll();
    }

    public Subscription addSubscription(Subscription subscription){
        return subscriptionRepository.save(subscription);
    }
    public Subscription updateSubscription(Long id, Subscription updatedSubscription) {
        return subscriptionRepository.findById(id)
                .map(subscription -> {
                    subscription.setLabel(updatedSubscription.getLabel());
                    subscription.setAmount(updatedSubscription.getAmount());
                    subscription.setDescription(updatedSubscription.getDescription());
                    subscription.setMonthYearStart(updatedSubscription.getMonthYearStart());
                    subscription.setMonthYearEnd(updatedSubscription.getMonthYearEnd());
                    return subscriptionRepository.save(subscription);
                })
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
    }
    public void deleteSubscription(Long id){
        subscriptionRepository.deleteById(id);
    }
    
    public Double getTotalForMonth(LocalDate monthYear){
        Double total = subscriptionRepository.getTotalSubscriptionsByMonth(monthYear);
        return total != null ? total : 0.0;
    }
}