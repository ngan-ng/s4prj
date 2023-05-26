package com.aptech.apiv1.model.admin;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.aptech.apiv1.model.Booking;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@NoArgsConstructor
@Entity
@Data
@Table(name = "Users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Email
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "admin_role",
        joinColumns = { @JoinColumn(name = "admin_id") }, 
        inverseJoinColumns = { @JoinColumn(name = "role_id") })
    @JsonManagedReference
    private List<Role> roles = new ArrayList<>();

    ///////////////////////////////////
    // Member
    private String title;
    private String firstName;
    private String lastName;
    private LocalDateTime dob;
    private long points;
    private String mobile;
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Booking> bookings = new ArrayList<>();
}
