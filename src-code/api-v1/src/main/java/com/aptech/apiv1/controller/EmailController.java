package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.EmailDto;
import com.aptech.apiv1.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping(path = "/api-v1/guest/email")
@CrossOrigin(origins = "${security.cors.origin}", methods = {
        RequestMethod.GET, RequestMethod.POST
})
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailDto emailDto) {
        try {
            emailService.send(emailDto);
            return new ResponseEntity<Void>(HttpStatus.CREATED);
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }
}

