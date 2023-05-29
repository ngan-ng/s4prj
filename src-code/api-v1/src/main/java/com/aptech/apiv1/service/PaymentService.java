package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.GroupBookingPaymentDto;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

public interface PaymentService {
    String authorizePayment(GroupBookingPaymentDto bookings) throws PayPalRESTException;
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;
}
