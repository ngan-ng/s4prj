package com.aptech.apiv1.model;

import com.aptech.apiv1.enums.ACType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.annotations.NaturalId;

import java.io.Serializable;

@Entity
@Data
@Accessors(chain = true)
public class Aircraft implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NaturalId
    private String reg;
    private String config;
    private String type = ACType.A320.toString();
}