package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findSeatsByFlightId(long flightId);
}
