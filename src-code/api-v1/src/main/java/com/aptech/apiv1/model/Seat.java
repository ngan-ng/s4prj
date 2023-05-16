package com.aptech.apiv1.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

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
    private String type;
    @Column(name = "description", columnDefinition = "varchar(MAX)")
    private String description;
    private double price = 0.0;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flightId", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private Flight flight;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookingId")
    private Booking booking;
}
