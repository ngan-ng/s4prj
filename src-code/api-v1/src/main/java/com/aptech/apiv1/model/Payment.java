package com.aptech.apiv1.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Entity
@Data
@Accessors(chain = true)
public class Payment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String paymentMethod;
    private double price;
    private String category;
    private String status;
    private long bookingId;
//    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
//    @JoinColumn(name = "booking_id")
//    private Booking booking;
}


//PaymentDetail
//  id;
//  payerAccount: email
//  payerFullName: NguyenToan
//  payerAddress: 6666
//  payerPhone: 6666
//  Date today;
//
// ui
//-> button payment -> (authorize payment) popup paypal account(username, password) input
//
//->















