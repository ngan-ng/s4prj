package com.aptech.apiv1.dto;

import com.aptech.apiv1.model.Booking;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class GroupBooking implements Serializable {
    @Valid
    List<Booking> bookings;

    public GroupBooking() {
        this.bookings = new ArrayList<>();
    }
}
