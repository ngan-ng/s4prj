package com.aptech.apiv1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Member implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String firstName;
    private String lastName;
    private long points;
    private String mobile;
    @Email
    private String email;
    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Booking> bookings = new ArrayList<>();
}
