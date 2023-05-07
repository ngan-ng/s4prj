package com.aptech.apiv1.model;

import com.aptech.apiv1.enums.Gender;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Booking implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "bookDate", columnDefinition = "Date")
    private Date bookDate;
    @Column(name = "title", columnDefinition = "varchar(20)")
    private String title;
    @Column(name = "firstName", columnDefinition = "varchar(50)")
    private String firstName;
    @Column(name = "lastName", columnDefinition = "varchar(50)")
    private String lastName;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(referencedColumnName = "id", name = "infantId")
    private Infant infant;
    @Column(name = "gender", columnDefinition = "varchar(3)")
    private Gender gender;
    @Column(name = "seq")
    private int seq;
    private String mobile;
    @Email
    private String email;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JsonBackReference
    private Member member;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Payment> payments = new ArrayList<>();
}
