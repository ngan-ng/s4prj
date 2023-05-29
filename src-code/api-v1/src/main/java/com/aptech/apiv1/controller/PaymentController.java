package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.GroupBooking;
import com.aptech.apiv1.dto.GroupBookingPaymentDto;
import com.aptech.apiv1.dto.PayPalExecuteDto;
import com.aptech.apiv1.dto.ReviewPaypalResponseDto;
import com.aptech.apiv1.service.impl.PaymentServiceImpl;
import com.paypal.api.payments.PayerInfo;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.ShippingAddress;
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
        try{
            if(bindingResult.hasErrors()){
                return ResponseEntity.badRequest().body(bindingResult.getAllErrors().stream()
                        .map(er -> String.format("Error: %s. ", er.getDefaultMessage())).toList());
            }
            return ResponseEntity.ok(paymentService.authorizePayment(bookings));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/review-paypal")
    public ResponseEntity<?> reviewPayment(@RequestParam String paymentId, @RequestParam String PayerID) {
        try {
            Payment payment = paymentService.getPaymentDetails(paymentId);
            PayerInfo payerInfo = payment.getPayer().getPayerInfo();
            Transaction transaction = payment.getTransactions().get(0);
            List<ReviewPaypalResponseDto> responseDtos= paymentService.reviewPaypal(payment.getTransactions());

            return ResponseEntity.ok(responseDtos);
        } catch (Exception ppEx) {
            return ResponseEntity.badRequest().body(ppEx.getMessage());
        }
    }
    @PostMapping("/execute-paypal")
    public ResponseEntity<?> executePayment(@RequestBody PayPalExecuteDto req) {
        try {
            Payment payment = paymentService.executePayment(req.getPaymentId(), req.getPayerId());
            System.out.println(payment);


            return ResponseEntity.ok("Successful payment");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
