package com.aptech.apiv1.model;

import com.aptech.apiv1.enums.FlightStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Currency;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Accessors(chain = true)
@Table(uniqueConstraints = {
    @UniqueConstraint(name = "Unique_FltNo_Date", columnNames = {"flightNumber", "STD"})
})
public class Flight implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "flightNumber", nullable = false)
    private int flightNumber;
    @Column(name = "STD", columnDefinition = "datetime", nullable = false, updatable = false)
    private LocalDateTime STD;
    @Column(name = "ETD", columnDefinition = "datetime")
    private LocalDateTime ETD;
    @Column(name = "duration", nullable = false)
    @Positive(message = "Must be positive")
    private int duration; // in Minutes
    @Column(name = "gate")
    @PositiveOrZero(message = "Must be positive")
    private int gate;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "origin", referencedColumnName = "iata_code", nullable = false)
    private Airport origin;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "destination", referencedColumnName = "iata_code", nullable = false)
    private Airport destination;
    @Column(name = "flightStatus", columnDefinition = "varchar(20)", nullable = false)
    private String flightStatus = FlightStatus.ONTIME.toString();
    @ManyToOne(fetch = FetchType.LAZY)
    private Aircraft aircraft;
    @Column(name = "basePrice", nullable = false)
    @PositiveOrZero(message = "Price cannot be negative")
    private double basePrice = 0;
    @OneToMany(mappedBy = "flight")
    @JsonIgnore
    private List<Booking> bookings = new ArrayList<>();
}