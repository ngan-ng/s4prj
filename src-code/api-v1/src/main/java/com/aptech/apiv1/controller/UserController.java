package com.aptech.apiv1.controller;

import com.aptech.apiv1.dto.UserDto;
import com.aptech.apiv1.dto.LoginRequest;
import com.aptech.apiv1.dto.TokenRefreshDto;
import com.aptech.apiv1.exception.TokenRefreshException;
import com.aptech.apiv1.service.UserService;
import com.aptech.apiv1.service.RefreshTokenService;
import com.aptech.apiv1.utils.JwtUtils;
import com.aptech.apiv1.model.RefreshToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api-v1/user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto userDto) {
        try{
            return ResponseEntity.ok(userService.signup(userDto));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public void login(@RequestBody @Valid LoginRequest login) {

        throw new IllegalStateException(
                "This method shouldn't be called. It's implemented by Spring Security filters.");
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshDto request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> ResponseEntity.ok(jwtUtils.generateTokenFromEmail(user.getEmail())))
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getUser() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

}
