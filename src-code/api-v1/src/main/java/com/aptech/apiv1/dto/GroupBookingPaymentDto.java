package com.aptech.apiv1.dto;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class GroupBookingPaymentDto {
    @Valid
    List<BookingPaymentDto> bookings = new ArrayList<>();
}
