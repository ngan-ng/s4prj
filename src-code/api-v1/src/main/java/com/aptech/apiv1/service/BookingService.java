package com.aptech.apiv1.service;

import com.aptech.apiv1.model.Booking;

import java.util.List;

public interface BookingService {
    List<Booking> findBookingByPnr(String pnr);
    Booking createBooking(Booking booking);
    Iterable<Booking> createBookings(List<Booking> bookings);
}