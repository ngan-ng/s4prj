package com.aptech.apiv1.controller;

import com.aptech.apiv1.model.Baggage;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-v1/guest/baggage")
public class BaggageController {

    public ResponseEntity<?> addBaggage(@Valid @RequestBody Baggage baggage){
        try{

            return ResponseEntity.status(HttpStatus.CREATED).body(baggage);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
