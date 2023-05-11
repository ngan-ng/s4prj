package com.aptech.apiv1.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
@Entity
@Data
@Accessors(chain = true)
@Table(uniqueConstraints = {
        @UniqueConstraint(name = "Unique_SeatNo_Flight", columnNames = {"seatNumber", "flightId"})
})
public class Seat implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "seatNumber", columnDefinition = "varchar(3)")
    private String seatNumber;
    private String type;
    @Column(name = "description", columnDefinition = "varchar(MAX)")
    private String description;
    private double price = 0.0;
    @ManyToOne
    @JoinColumn(name = "flightId", referencedColumnName = "id", nullable = false)
    private Flight flight;
    @OneToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;
}
