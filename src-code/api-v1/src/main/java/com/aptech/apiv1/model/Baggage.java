package com.aptech.apiv1.model;

import com.aptech.apiv1.enums.BagStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Data
public class Baggage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "tag_no")
    private UUID tagNo;
    @Column(name = "status")
    private BagStatus status;
    @Column(name = "piece", columnDefinition = "tinyint")
    private byte piece;
    @Column(name = "weigth",columnDefinition = "tinyint")
    private byte weight;
    @Column(name = "barcode")
    private String barcode;

//    private Booking booking;
}
