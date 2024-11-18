package com.ecommerce.repository;

import com.ecommerce.model.PaymentInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentInformationRepository extends JpaRepository<PaymentInformation, Long> {
    // You can define custom queries here if needed, for example:
    // PaymentInformation findByCardNumber(String cardNumber);
}