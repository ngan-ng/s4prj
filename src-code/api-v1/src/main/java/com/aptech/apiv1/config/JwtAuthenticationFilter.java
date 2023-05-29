package com.aptech.apiv1.config;

import com.aptech.apiv1.dto.LoginRequest;
import com.aptech.apiv1.utils.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;
import java.util.ArrayList;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private JwtUtils jwtUtils;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api-v1/user/login", "POST"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException {
        try {
            LoginRequest user = new ObjectMapper().readValue(req.getInputStream(), LoginRequest.class);
            return authenticationManager.authenticate((new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), new ArrayList<>())));

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) throws IOException {

        if (auth.getPrincipal() != null) {
            org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) auth.getPrincipal();
            String login = user.getUsername();
            if (login != null && login.length() > 0) {

                String accessTokenJson = new ObjectMapper().writeValueAsString(jwtUtils.generateToken(auth));
                res.setContentType("application/json");
                res.getWriter().write(accessTokenJson);

            }
        }
    }

}

