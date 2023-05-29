package com.aptech.apiv1.model;

import com.aptech.apiv1.enums.BookingStatus;
import com.aptech.apiv1.enums.Gender;
import com.aptech.apiv1.model.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "flightId", nullable = false)
    private Flight flight;
    @Column(name = "bookDate", columnDefinition = "datetime", nullable = false)
    private LocalDateTime bookDate = LocalDateTime.now();
    @Column(name = "dob", columnDefinition = "datetime")
    private LocalDateTime dob;
    @Column(name = "status")
    private String status = String.valueOf(BookingStatus.UNPAID);
    @Column(name = "seq", updatable = false)
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
    @Column(name = "bagAllowance")
    private int bagAllowance = 0;
    private String mobile;
    @Email(message = "Invalid email format")
    private String email;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "memberId")
    private User member;
    @OneToMany(mappedBy = "booking",fetch = FetchType.LAZY)
    private List<Baggage> baggages = new ArrayList<>();

}
