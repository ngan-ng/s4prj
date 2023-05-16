package com.aptech.apiv1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Accessors(chain = true)
@Table(uniqueConstraints = {
    @UniqueConstraint(name = "Unique_FltNo_Date", columnNames = {"flightNumber", "date"})
})
public class Flight implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "flightNumber")
    private int flightNumber;
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "origin", referencedColumnName = "iata_code", nullable = false)
    private Airport origin;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "destination", referencedColumnName = "iata_code", nullable = false)
    private Airport destination;
    @ManyToOne(fetch = FetchType.LAZY)
    private Aircraft aircraft;

    @OneToMany(mappedBy = "flight")
    @JsonIgnore
    private List<Booking> bookings = new ArrayList<>();
}