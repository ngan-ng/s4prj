package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.SearchRequestDto;
import com.aptech.apiv1.service.impl.FlightServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api-v1/guest/flight")
@CrossOrigin(origins = "${security.cors.origin}", methods = {
        RequestMethod.GET, RequestMethod.POST
})
public class FlightController {
    @Autowired
    private FlightServiceImpl flightService;
    @PostMapping("/search")
    public ResponseEntity<?> searchFlight(@RequestBody SearchRequestDto searchDto){
        try {
            return ResponseEntity.ok().body(flightService.searchFlight(searchDto));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
