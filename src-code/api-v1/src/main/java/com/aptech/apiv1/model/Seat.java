package com.aptech.apiv1.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
//@Builder
@Accessors(chain = true)
@Table(uniqueConstraints = {
        @UniqueConstraint(name = "Unique_SeatNo_Flight", columnNames = {"seatNumber", "flightId"})
})
public class Seat implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "seatNumber", columnDefinition = "varchar(3)")
    private String seatNumber;
    private String status;
    private String seatType; // STANDARD, EXIT, HOTSEAT
    private String classType = "Y"; // F: First, C: Business, Y: Economy
    @Column(name = "description", columnDefinition = "varchar(MAX)")
    private String description;
    private double price = 0.0;
    private LocalDateTime selectedAt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flightId", referencedColumnName = "id", nullable = false)
    private Flight flight;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookingId")
    private Booking booking;
}
