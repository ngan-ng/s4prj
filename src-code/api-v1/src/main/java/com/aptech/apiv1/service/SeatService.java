package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.SelectSeatDto;
import org.springframework.http.HttpStatus;

public interface SeatService {
    HttpStatus handleSeat(SelectSeatDto seat);
}
