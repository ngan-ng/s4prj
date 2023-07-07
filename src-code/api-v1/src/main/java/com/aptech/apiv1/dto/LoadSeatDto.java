package com.aptech.apiv1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoadSeatDto implements Serializable {
    private long id;
    private String seatNumber;
    private String seatType;
    private String classType;
    private String status;
    private LocalDateTime selectedAt;
    private String description;
    private double price;
    private long bookingId;
}
