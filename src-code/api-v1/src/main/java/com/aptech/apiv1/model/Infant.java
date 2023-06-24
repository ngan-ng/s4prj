package com.aptech.apiv1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Entity
@Data
public class Infant implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "firstName", columnDefinition = "varchar(50)")
    private String firstName;
    @Column(name = "lastName", columnDefinition = "varchar(50)")
    private String lastName;
    @Column(name = "dob", columnDefinition = "Date")
    private Date dob;

    @OneToOne(mappedBy = "infant",fetch = FetchType.LAZY)
    @JsonIgnore
    private Booking booking;
}
