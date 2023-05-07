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
    private PaymentMethod paymentMethod;
    private double singlePrice;
    private double airportFee;
    private double tax;
    private String status;
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "booking_id")
    @JsonBackReference
    private Booking booking;
}
