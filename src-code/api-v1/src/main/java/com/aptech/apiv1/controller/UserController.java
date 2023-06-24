package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.UserDto;
import com.aptech.apiv1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api-v1/user")
@CrossOrigin(origins = "${security.cors.origin}", methods = {
        RequestMethod.GET, RequestMethod.POST
})
public class UserController {
    @Autowired
    private UserService userService;
//    @PostMapping("/addAdmin")
//    public ResponseEntity<?> addAdmin(@RequestBody UserDto userDto){
//        try {
//            return ResponseEntity.ok().body(userService.addAdmin(userDto.getEmail()));
//        } catch (Exception ex) {
//            return ResponseEntity.notFound().build();
//        }
//    }
    @PostMapping("/findUser")
    public ResponseEntity<?> checkUser(@RequestBody UserDto userDto){
        try {
            return ResponseEntity.ok().body(userService.findByEmail(userDto.getEmail()));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
