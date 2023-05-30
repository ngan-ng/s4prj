package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Payment;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface PaymentRepository extends JpaRepositoryImplementation<Payment, Long> {
    List<Payment> getPaymentsByBookingId(long bookingId);
}
