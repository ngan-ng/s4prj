package com.aptech.apiv1.dto;

import com.aptech.apiv1.model.Booking;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatDto implements Serializable {
    private long id;
    private String seatNumber;
    private String type;
    private String description;
    private double price;
    private Booking booking;
}
