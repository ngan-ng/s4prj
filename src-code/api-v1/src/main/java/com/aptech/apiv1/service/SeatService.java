package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.SelectSeatDto;
import com.aptech.apiv1.model.Seat;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface SeatService {
    HttpStatus handleSeat(SelectSeatDto seat);
    List<Seat> getSeatsByFlight(long flightId);
}
