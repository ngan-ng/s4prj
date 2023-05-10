package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.GroupBooking;
import com.aptech.apiv1.model.Booking;
import com.aptech.apiv1.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static com.aptech.apiv1.utils.business.PnrGenerator.generatePnr;

@RestController
@RequestMapping(path = "/api-v1/guest/booking")
public class BookingController {
    private final BookingService bookingService;
    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBookings(@RequestBody @Valid GroupBooking groupBooking, BindingResult bindingResult){
        try{
            String pnr = generatePnr();
            for (Booking booking : groupBooking.getBookings()) {
                List<String> errors = checkValidBooking(booking, bindingResult);
                if(errors != null){
                    return ResponseEntity.badRequest().body(errors);
                }
                booking.setPnr(pnr);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBookings(groupBooking.getBookings()));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    List<String> checkValidBooking(@Valid Booking booking, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return bindingResult.getAllErrors().stream().map(er -> String.format("Error: %s. ", er.getDefaultMessage())).toList();
        }
        return null;
    }
}