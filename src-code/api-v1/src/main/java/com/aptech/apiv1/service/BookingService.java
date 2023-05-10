package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.GroupBooking;
import com.aptech.apiv1.model.Booking;

public interface BookingService {
    Booking createBooking(Booking booking);
    Iterable<Booking> createBookings(GroupBooking groupBooking);
}