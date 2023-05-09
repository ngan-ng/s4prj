package com.aptech.apiv1.model;

import com.aptech.apiv1.enums.IataCode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;
@Entity
@Data
@Accessors(chain = true)
public class Airport implements Serializable {
    @Id
    @Column(name = "iata_code", columnDefinition = "varchar(3)")
    private String iata_code;
    @Column(name = "name", columnDefinition = "varchar(50)")
    private String name;
    @Column(name = "location", columnDefinition = "varchar(50)")
    private String location;

}
