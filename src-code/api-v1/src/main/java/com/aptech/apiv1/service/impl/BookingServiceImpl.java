package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.GroupBooking;
import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.repository.BookingRepository;
import com.aptech.apiv1.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Override
    public Booking createBooking(Booking booking) {

        return null;
    }

    @Override
    public Iterable<Booking> createBookings(GroupBooking groupBooking) {
        return bookingRepository.saveAll(groupBooking.getBookings());
    }
}