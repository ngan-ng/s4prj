package com.aptech.apiv1.controller;

import com.aptech.apiv1.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api-v1/guest/airport")
@CrossOrigin(origins = "${security.cors.origin}", methods = {
       RequestMethod.GET
})
public class AirportController {
    private final AirportRepository airportRepository;

    @Autowired
    public AirportController(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAirports() {
        try{
            return ResponseEntity.ok().body(airportRepository.findAll());
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
