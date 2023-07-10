package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.BoardingPass;
import com.aptech.apiv1.dto.CheckinDto;
import com.aptech.apiv1.dto.CheckinRequestDtos;
import com.aptech.apiv1.enums.BookingStatus;
import com.aptech.apiv1.enums.SeatStatus;
import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.model.Seat;
import com.aptech.apiv1.repository.BookingRepository;
import com.aptech.apiv1.repository.SeatRepository;
import com.aptech.apiv1.service.BookingService;
import com.aptech.apiv1.utils.business.PnrGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final SeatRepository seatRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository, SeatRepository seatRepository) {
        this.bookingRepository = bookingRepository;
        this.seatRepository = seatRepository;
    }

    @Override
    public List<Booking> findBookingByPnr(String pnr) {
        return bookingRepository.findBookingByPnr(pnr);
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

    @Override
    public List<BoardingPass> checkin(CheckinRequestDtos checkinRequestDtos) throws Exception {
        List<BoardingPass> boardingPasses = new ArrayList<>();
        List<Booking> bookings = new ArrayList<>();
        int latestSeq = 0;
        int step = 1;
        for (CheckinDto item : checkinRequestDtos.getCheckinRequestDtos()) {
            Booking booking = bookingRepository.findById(item.getBookingId()).orElseThrow();
            Seat seat = seatRepository.findById(item.getSeatId()).orElseThrow();
            if (!booking.getStatus().equalsIgnoreCase(String.valueOf(BookingStatus.CONFIRMED))) {
                throw new Exception("Unable to checkin due to booking's balance");
            }
            if (seat.getFlight() != booking.getFlight()) {
                throw new Exception("Unable to checkin due to wrong flight");
            }
            if (seat.getBooking() != booking) {
                throw new Exception("Unable to checkin, please contact checkin counter for more details");
            }
            if (!seat.getStatus().equalsIgnoreCase(String.valueOf(SeatStatus.OCCUPIED))) {
                throw new Exception("Unable to checkin due to seat assignment, please contact checkin counter for more details");
            }
            if (step == 1) {
                latestSeq = bookingRepository.findMaxSeq(booking.getFlight().getId());
            }
            int seq = latestSeq + step++;
            // This action is equivalent to CHECK IN
            booking.setSeq(seq);
            booking.setStatus(String.valueOf(BookingStatus.CHECKIN));
            bookings.add(booking);

            BoardingPass bp = new BoardingPass();
            bp.setFullName(String.format("%s %s", booking.getFirstName(), booking.getLastName()));
            bp.setOrigin(booking.getFlight().getOrigin());
            bp.setDestination(booking.getFlight().getDestination());
            bp.setFlightNumber(String.valueOf(booking.getFlight().getFlightNumber()));
            LocalDateTime atd; // Actual time of departure
            if (booking.getFlight().getETD() != null) {
                atd = booking.getFlight().getETD(); // In case flight is delayed
            } else {
                atd = booking.getFlight().getSTD(); // In case flight is on-time
            }
            bp.setDate((String) Array.get(String.valueOf(atd).split("T", 2), 0));
            bp.setTime((String) Array.get(String.valueOf(atd).split("T", 2), 1));
            bp.setSeatNumber(seat.getSeatNumber());
            bp.setPnr(booking.getPnr());
            bp.setGate(String.valueOf(booking.getFlight().getGate()));
            bp.setSeq(seq);
            boardingPasses.add(bp);
        }
        bookingRepository.saveAll(bookings);
        return boardingPasses;
    }


}