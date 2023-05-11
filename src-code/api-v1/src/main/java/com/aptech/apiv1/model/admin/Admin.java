package com.aptech.apiv1.model.admin;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class Admin implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "admin_role", 
        joinColumns = { @JoinColumn(name = "admin_id") }, 
        inverseJoinColumns = {
        @JoinColumn(name = "role_id") })
    @JsonManagedReference
    private List<Role> roles;
}
