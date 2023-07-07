package com.aptech.apiv1.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;

import java.io.Serializable;
@Getter
public class SelectSeatDto implements Serializable {
    @Positive(message = "Seat Id is required")
    private long id;
    @PositiveOrZero(message = "Booking Id is required")
    private long bookingId;
    @NotBlank(message = "Failed action")
    private String action;
}
