package com.aptech.apiv1.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import org.hibernate.annotations.NaturalId;

import java.io.Serializable;
import java.util.UUID;
@Entity
@Data
public class Airport implements Serializable {
    @Id
    @Column(name = "iata_code", columnDefinition = "varchar(3)")
    private String iata_code;
    @Column(name = "name", columnDefinition = "varchar(50)")
    private String name;
    @Column(name = "city", columnDefinition = "varchar(50)")
    private String city;
}
