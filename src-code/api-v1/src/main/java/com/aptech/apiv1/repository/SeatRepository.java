package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findSeatsByFlightId(long flightId);

    List<Seat> findSeatsByFlightIdAndBookingId(long flightId, long bookingId);
//    @Query("select new com.aptech.apiv1.dto.SeatDto(s.id, s.seatNumber, s.type, s.description, s.price, s.booking)" +
//            " from Seat s where s.flight.id = :flightId")
//    List<SeatDto> findSeatsByFlightId(long flightId);
}
