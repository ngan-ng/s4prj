package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.LoadSeatDto;
import com.aptech.apiv1.dto.SelectSeatDto;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface SeatService {
    HttpStatus handleSeat(SelectSeatDto seat);
    List<LoadSeatDto> getSeatsByFlight(long flightId);
}
