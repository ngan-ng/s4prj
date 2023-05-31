package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.GroupBookingPaymentDto;
import com.aptech.apiv1.model.Payment;
import com.paypal.base.rest.PayPalRESTException;

import java.util.List;

public interface PaymentService {
    String authorizePayment(GroupBookingPaymentDto bookings) throws PayPalRESTException;
    public List<Payment> executePayment(String paymentId, String payerId) throws PayPalRESTException;
}
