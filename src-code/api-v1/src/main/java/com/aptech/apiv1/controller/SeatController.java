package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.SelectSeatDto;
import com.aptech.apiv1.service.SeatService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import static com.aptech.apiv1.utils.business.MessageSeatStatus.selectSeatStatus;

@RestController
@RequestMapping(path = "/api-v1/guest/seat")
@CrossOrigin(origins = "${security.cors.origin}", methods = {
        RequestMethod.GET, RequestMethod.POST
})
public class SeatController {
    private final SeatService seatService;
    @Autowired
    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping("/getAllByFlight/{flightId}")
    public ResponseEntity<?> getSeatsByFlight(@PathVariable long flightId){
        try{
            return ResponseEntity.ok(seatService.getSeatsByFlight(flightId));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PostMapping(path = {"/handle"})
    public ResponseEntity<?> handleSeat(@RequestBody @Valid SelectSeatDto selectSeatDto, BindingResult bindingResult){
        try{
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest().body(bindingResult.getAllErrors().stream()
                        .map(er -> String.format("Error: %s. ", er.getDefaultMessage())).toList());
            }
            HttpStatus status = seatService.handleSeat(selectSeatDto);
            return ResponseEntity.status(status).body(selectSeatStatus(status));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
