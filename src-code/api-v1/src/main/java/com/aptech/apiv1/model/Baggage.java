package com.aptech.apiv1.model;

import com.aptech.apiv1.enums.BagStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Data
@Accessors(chain = true)
public class Baggage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "tag_no", columnDefinition = "varchar(12)", nullable = false)
    private String tagNo;
    @Column(name = "status", nullable = false, columnDefinition = "varchar(20)")
    private String status = BagStatus.CHECKED.toString();
    @Column(name = "piece", columnDefinition = "tinyint", nullable = false)
    @Positive(message = "Cannot be less than zero")
    private byte piece = 1;
    @Column(name = "weigth",columnDefinition = "tinyint", nullable = false)
    @Max(value = 32, message = "One baggage cannot exceed 32 kgs")
    @Positive(message = "Cannot be less than zero")
    private byte weight;
    @Column(name = "barcode", nullable = false)
    private String barcode;
    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "bookingId", nullable = false)
    @JsonBackReference
    private Booking booking;
}
