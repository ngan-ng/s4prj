package com.aptech.apiv1.utils;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.aptech.apiv1.dto.AccessTokenDto;
import com.aptech.apiv1.model.admin.User;
import com.aptech.apiv1.repository.AdminRepository;
import com.aptech.apiv1.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import static com.aptech.apiv1.config.SecurityConstants.SECRET;
import static com.aptech.apiv1.config.SecurityConstants.TOKEN_EXPIRATION_TIME;

@Component
public class JwtUtils {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private AdminRepository adminRepository;

    public AccessTokenDto generateToken(Authentication auth) {

        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) auth.getPrincipal();
        String login = user.getUsername();

        Claims claims = Jwts.claims().setSubject(login);
        List<String> roles = new ArrayList<>();
        user.getAuthorities().stream().forEach(authority -> roles.add(authority.getAuthority()));
        claims.put("roles", roles);
        String token = Jwts.builder().setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET).compact();

        AccessTokenDto accessToken = new AccessTokenDto();
        accessToken.setRoles(roles);
        accessToken.setToken(token);
        accessToken.setRefreshToken(refreshTokenService.createRefreshToken(login).getToken());
        return accessToken;

    }

    public AccessTokenDto generateTokenFromEmail(String email) {

        User user = adminRepository.findByEmail(email).get();
        Claims claims = Jwts.claims().setSubject(email);
        List<String> roles = new ArrayList<>();
        user.getRoles().stream().forEach(authority -> roles.add(authority.getRole().toString()));
        claims.put("roles", roles);
        String token = Jwts.builder().setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET).compact();

        AccessTokenDto accessToken = new AccessTokenDto();
        accessToken.setRoles(roles);
        accessToken.setToken(token);
        accessToken.setRefreshToken(refreshTokenService.createRefreshToken(email).getToken());
        return accessToken;
    }


}
