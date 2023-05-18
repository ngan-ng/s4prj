package com.aptech.apiv1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoadSeatDto implements Serializable {
    private long id;
    private String seatNumber;
    private String type;
    private String description;
    private double price;
    private long booking;
}