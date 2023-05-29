package com.aptech.apiv1.dto;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class GroupBookingPaymentDto implements Serializable {
    @Valid
    List<BookingPaymentDto> bookings = new ArrayList<>();
}
