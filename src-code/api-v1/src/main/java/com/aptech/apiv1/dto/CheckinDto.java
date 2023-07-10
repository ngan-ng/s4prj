package com.aptech.apiv1.dto;

import jakarta.validation.constraints.Positive;
import lombok.Getter;

import java.io.Serializable;
@Getter
public class CheckinDto implements Serializable {
    @Positive(message = "Booking id is required")
    private long bookingId;
    @Positive(message = "Seat id is required")
    private long seatId;
}
