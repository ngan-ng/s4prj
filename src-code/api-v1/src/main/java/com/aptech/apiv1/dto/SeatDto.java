package com.aptech.apiv1.dto;

import com.aptech.apiv1.model.Booking;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class SeatDto {
    private long id;
    private String seatNumber;
    private String type;
    private String description;
    private double price;
    private Booking booking = new Booking();
}
