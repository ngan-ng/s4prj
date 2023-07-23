package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.LoadSeatDto;
import com.aptech.apiv1.dto.SelectSeatDto;
import com.aptech.apiv1.enums.SeatStatus;
import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.model.Seat;
import com.aptech.apiv1.repository.BookingRepository;
import com.aptech.apiv1.repository.SeatRepository;
import com.aptech.apiv1.service.SeatService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
public class SeatServiceImpl implements SeatService {
    private final SeatRepository seatRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public SeatServiceImpl(SeatRepository seatRepository, BookingRepository bookingRepository) {
        this.seatRepository = seatRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public HttpStatus handleSeat(SelectSeatDto dto) {
        ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        LocalDateTime now = LocalDateTime.now(zoneId);
        Optional<Seat> seatOpt = seatRepository.findById(dto.getId());
        Optional<Booking> bookingOpt = bookingRepository.findById(dto.getBookingId());
        // SEAT or BOOKING NOT FOUND
        if (seatOpt.isEmpty() || bookingOpt.isEmpty()) {
            return HttpStatus.NOT_FOUND;
        }

        Seat seat = seatOpt.get();
        Booking booking = bookingOpt.get();
        if (seat.getFlight() != booking.getFlight()) {
            // SEAT AND BOOKING NOT THE SAME FLIGHT
            return HttpStatus.CONFLICT;
        }
        String action = dto.getAction().toLowerCase();
        switch (action) {
            case "select" -> {
                // ACTION SELECT SEAT
                String seatStatus = seat.getStatus();
                if (!seatStatus.equalsIgnoreCase(String.valueOf(SeatStatus.AVAILABLE))) {
                    // SEAT NOT AVAILABLE NOW due to BLOCK or RESERVED or just NOT-AVAILABLE
                    if (seatStatus.equalsIgnoreCase(String.valueOf(SeatStatus.TEMP))) {
                        if (seat.getSelectedAt() != null &&
                                Duration.between(seat.getSelectedAt(), now).toMinutes() < 10) {
                            if(seat.getBooking().getId() != dto.getBookingId()){
                            return HttpStatus.SERVICE_UNAVAILABLE;
                            }
                        }
                    } else {
                        // SELECTED || BLOCKED ||
                        return HttpStatus.SERVICE_UNAVAILABLE;
                    }
                }
//                if (seat.getBooking() != null && seat.getBooking().getId() != 0) {
//                    if (seat.getBooking().getId() == dto.getBookingId()) {
//                        return HttpStatus.ACCEPTED; // ALREADY RESERVED for this Booking
//                    }
//                }
                seat.setStatus(String.valueOf(SeatStatus.TEMP));
                seat.setBooking(booking);
                seat.setSelectedAt(now);
                seatRepository.save(seat);
                return HttpStatus.OK;
            }
            case "unselect" -> {
                // ACTION UNSELECT SEAT
                if (!seat.getStatus().equalsIgnoreCase(String.valueOf(SeatStatus.TEMP))) { // ALREADY UNSELECT
                    return HttpStatus.METHOD_NOT_ALLOWED;
                }
                if (seat.getBooking().getId() != dto.getBookingId()) {
                    return HttpStatus.METHOD_NOT_ALLOWED; // NOT THE SEAT OWNER, CANNOT UNSELECT
                }
                seat.setBooking(null)
                        .setSelectedAt(null)
                        .setStatus(String.valueOf(SeatStatus.AVAILABLE));
                seatRepository.save(seat);
                return HttpStatus.OK;
            }
            case "complete" -> {
                if (seat.getBooking() == null || seat.getBooking().getId() == 0 || seat.getBooking().getId() != dto.getBookingId()) {
                    return HttpStatus.METHOD_NOT_ALLOWED;
                }
                seat.setStatus(String.valueOf(SeatStatus.OCCUPIED));
                seatRepository.save(seat);
                return HttpStatus.OK;
            }
            default -> {
                return HttpStatus.BAD_REQUEST; // ACTION INVALID
            }
        }
    }

    @Override
    public List<LoadSeatDto> getSeatsByFlight(long flightId) {
//        return seatRepository.findSeatsByFlightId(flightId);

        List<Seat> seats = seatRepository.findSeatsByFlightId(flightId);
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.typeMap(Seat.class, LoadSeatDto.class).addMappings(mapper ->
                mapper.map(src -> src.getBooking().getId(), LoadSeatDto::setBookingId));
        return seats.stream().map((seat -> modelMapper.map(seat, LoadSeatDto.class))).toList();
    }

}
