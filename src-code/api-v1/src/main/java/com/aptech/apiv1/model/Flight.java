package com.aptech.apiv1.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

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
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "origin", referencedColumnName = "iata_code", nullable = false)
    private Airport origin;
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "destination", referencedColumnName = "iata_code", nullable = false)
    private Airport destination;
}