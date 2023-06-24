package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.repository.BookingRepository;
import com.aptech.apiv1.service.BookingService;
import com.aptech.apiv1.utils.business.PnrGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<Booking> findBookingByPnr(String pnr) {
        List<Booking> bookings = bookingRepository.findBookingByPnr(pnr);

        return bookings;
    }

    @Override
    public Booking createBooking(Booking booking) {

        return null;
    }

    @Override
    public Iterable<Booking> createBookings(List<Booking> bookings) {
        PnrGenerator.generateAndSetPnr(bookings);
        return bookingRepository.saveAll(bookings);
    }
}