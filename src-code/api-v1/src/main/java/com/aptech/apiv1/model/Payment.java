package com.aptech.apiv1.model;

import com.aptech.apiv1.enums.PaymentMethod;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
@Entity
@Data
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
