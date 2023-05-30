package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.GroupBookingPaymentDto;
import com.aptech.apiv1.dto.paypal.PayPalExecuteDto;
import com.aptech.apiv1.dto.paypal.ReviewPaypalResponseDto;
import com.aptech.apiv1.service.impl.PaymentServiceImpl;
import com.paypal.api.payments.PayerInfo;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.Transaction;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api-v1/guest/payment")
public class PaymentController {
    private final PaymentServiceImpl paymentService;

    @Autowired
    public PaymentController(PaymentServiceImpl paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/checkout-paypal")
    public ResponseEntity<?> authorizePayment(@RequestBody @Valid GroupBookingPaymentDto bookings, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest().body(bindingResult.getAllErrors().stream()
                        .map(er -> String.format("Error: %s. ", er.getDefaultMessage())).toList());
            }
            return ResponseEntity.ok(paymentService.authorizePayment(bookings));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/review-paypal")
    public ResponseEntity<?> reviewPayment(@RequestParam String paymentId, @RequestParam String PayerID) {
        try {
//            Payment payment = paymentService.getPaymentDetails(paymentId);
            ReviewPaypalResponseDto responseDtos = paymentService.reviewPaypal(paymentId);

            return ResponseEntity.ok(responseDtos);
        } catch (Exception ppEx) {
            return ResponseEntity.badRequest().body(ppEx.getMessage());
        }
    }

    @PostMapping("/execute-paypal")
    public ResponseEntity<?> executePayment(@RequestBody PayPalExecuteDto req) {
        try {
            List<com.aptech.apiv1.model.Payment> payments = paymentService.executePayment(req.getPaymentId(), req.getPayerId());
            System.out.println(payments);


            return ResponseEntity.ok(payments);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
