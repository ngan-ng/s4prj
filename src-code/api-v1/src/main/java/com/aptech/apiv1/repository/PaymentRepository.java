package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Payment;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface PaymentRepository extends JpaRepositoryImplementation<Payment, Long> { }
