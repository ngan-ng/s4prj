package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.GroupBooking;
import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.service.BookingService;
import jakarta.validation.Valid;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api-v1/guest/booking")
public class BookingController {
    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/{pnr}")
    public ResponseEntity<?> getBookingsByPnr(@PathVariable String pnr) {
        try {
            return ResponseEntity.ok().body(bookingService.findBookingByPnr(pnr));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/create", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> createBookings(@RequestBody @Valid GroupBooking groupBooking, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest().body(bindingResult.getAllErrors().stream()
                        .map(er -> String.format("Error: %s. ", er.getDefaultMessage())).toList());
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBookings(groupBooking.getBookings()));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}