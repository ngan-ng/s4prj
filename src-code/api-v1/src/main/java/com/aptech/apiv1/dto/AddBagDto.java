package com.aptech.apiv1.dto;

import com.aptech.apiv1.enums.IataCode;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBagDto {
    @NotNull(message = "bookingId is required")
    private Long bookingId;
    @NotNull(message = "Destination is required")
    private IataCode dest;
    @Positive(message = "Cannot be less than zero")
    private byte piece = 1;
    @Max(value = 32, message = "One baggage cannot exceed 32 kgs")
    @Positive(message = "Cannot be less than zero")
    @NotNull(message = "Weight is required")
    private byte weight;
}
