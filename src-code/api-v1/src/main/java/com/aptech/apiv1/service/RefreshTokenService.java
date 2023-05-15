package com.aptech.apiv1.service;

import com.aptech.apiv1.model.RefreshToken;

import java.util.Optional;

public interface RefreshTokenService {
    public Optional<RefreshToken> findByToken(String token);
    public RefreshToken createRefreshToken(String email);
    public RefreshToken verifyExpiration(RefreshToken token);
}
