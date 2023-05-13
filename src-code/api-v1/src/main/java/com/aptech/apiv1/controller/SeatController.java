package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.SelectSeatDto;
import com.aptech.apiv1.service.SeatService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;

import static com.aptech.apiv1.utils.business.MessageSeatStatus.selectSeatStatus;

@RestController
@RequestMapping(path = "/api-v1/guest/seat")
public class SeatController {
    private final SeatService seatService;
    @Autowired
    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @PostMapping(path = {"/handle"})
    public ResponseEntity<?> handleSeat(@RequestBody SelectSeatDto selectSeatDto){
        try{
            HttpStatus status = seatService.handleSeat(selectSeatDto);
            return ResponseEntity.status(status).body(selectSeatStatus(status));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
