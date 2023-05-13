package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.SelectSeatDto;
import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.model.Seat;
import com.aptech.apiv1.repository.SeatRepository;
import com.aptech.apiv1.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeatServiceImpl implements SeatService {
    private final SeatRepository seatRepository;
    @Autowired
    public SeatServiceImpl(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @Override
    public HttpStatus handleSeat(SelectSeatDto dto) {
        Optional<Seat> seat = seatRepository.findById(dto.getId());
        // SEAT NOT FOUND
        if (seat.isEmpty()){
            return HttpStatus.NOT_FOUND;
        }
        String action = dto.getAction();
        if(action.equalsIgnoreCase("select")){
            // ACTION SELECT SEAT
            if (seat.get().getBooking() != null) {
                if (seat.get().getBooking().getId() != dto.getBookingId()) {
                    return HttpStatus.SERVICE_UNAVAILABLE; // SOMEONE RESERVED SEAT just before
                } else {
                    return HttpStatus.ACCEPTED; // ALREADY RESERVED for this Booking
                }
            }
            seat.get().setBooking(new Booking().setId(dto.getBookingId()));
            return seatRepository.save(seat.get()).getBooking().getId() == dto.getBookingId()
                    ? HttpStatus.OK : HttpStatus.EXPECTATION_FAILED;
        } else if (action.equalsIgnoreCase("unselect")) {
            // ACTION UNSELECT SEAT
            if (seat.get().getBooking() == null) { // ALREADY UNSELECT
                return HttpStatus.ACCEPTED;
            }
            if (seat.get().getBooking().getId() != dto.getBookingId()) {
                return HttpStatus.METHOD_NOT_ALLOWED; // NOT THE SEAT OWNER, CANNOT UNSELECT
            }
            seat.get().setBooking(null);
            seatRepository.save(seat.get());
            return HttpStatus.OK;
        }else {
            return HttpStatus.BAD_REQUEST; // ACTION INVALID
        }
    }

    @Override
    public List<Seat> getSeatsByFlight(long flightId) {
        return seatRepository.findSeatsByFlightId(flightId);
    }
}
