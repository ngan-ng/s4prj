package com.aptech.apiv1.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@Entity
@Data
public class Infant implements Serializable {
    @Id
    private long id;
    @Column(name = "firstName", columnDefinition = "varchar(50)")
    private String firstName;
    @Column(name = "lastName", columnDefinition = "varchar(50)")
    private String lastName;
    @Column(name = "dob", columnDefinition = "Date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date dob;

    @OneToOne(mappedBy = "infant",fetch = FetchType.LAZY)
    private Booking booking;
}
