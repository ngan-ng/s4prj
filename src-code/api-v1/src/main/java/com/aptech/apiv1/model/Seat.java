package com.aptech.apiv1.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
@Entity
@Data
@Accessors(chain = true)
public class Seat implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "seatNumber", columnDefinition = "varchar(3)")
    @Pattern(regexp = "[\\d{1,2}a-fA-F]") // due to body of A320, A321
    private String seatNumber;
    private String type;
    private String description;
    private double price = 0.0;
    @ManyToOne
    private Flight flight;
    @OneToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;
}
