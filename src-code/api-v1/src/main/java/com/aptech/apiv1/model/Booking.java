package com.aptech.apiv1.model;

import com.aptech.apiv1.enums.Gender;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Accessors(chain = true)
//@Table(uniqueConstraints = {
//        @UniqueConstraint(name = "Unique_bookingSeq_flight", columnNames = {"flightId", "seq"})
//})
public class Booking implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "pnr", nullable = false)
    private String pnr;
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "flightId", nullable = false)
    private Flight flight;
    @Column(name = "bookDate", columnDefinition = "Date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date bookDate = new Date();
    @Column(name = "seq", updatable = false)
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "flightSEQ_generator")
//    @SequenceGenerator(name = "flightSEQ_generator", sequenceName = "flight_seq")
    private int seq = 0;
    @Column(name = "title", columnDefinition = "varchar(20)", nullable = false)
    private String title = "Mr.";
    @Column(name = "firstName", columnDefinition = "varchar(50)", nullable = false)
    @NotBlank(message = "Firstname is required")
    private String firstName;
    @Column(name = "lastName", columnDefinition = "varchar(50)", nullable = false)
    @NotBlank(message = "Lastname is required")
    private String lastName;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(referencedColumnName = "id", name = "infantId")
    private Infant infant;
    @Column(name = "gender", columnDefinition = "varchar(3)", nullable = false)
    private String gender = Gender.ADL.toString();
    private String mobile;
    @Email(message = "Invalid email format")
    private String email;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "memberId")
    @JsonBackReference
    private Member member;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Payment> payments = new ArrayList<>();
    @OneToMany(mappedBy = "booking",fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Baggage> baggages = new ArrayList<>();
}