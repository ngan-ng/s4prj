package com.aptech.apiv1.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/write")
@CrossOrigin(origins = "${security.cors.origin}", methods = {
        RequestMethod.GET
})
public class TestController {
    @GetMapping
    public String write(){
        return "WRITE OKE MEAN NOT OKE";
    }
}
