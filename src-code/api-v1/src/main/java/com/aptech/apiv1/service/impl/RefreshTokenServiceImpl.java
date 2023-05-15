package com.aptech.apiv1.service.impl;


import com.aptech.apiv1.model.RefreshToken;
import com.aptech.apiv1.repository.AdminRepository;
import com.aptech.apiv1.repository.RefreshTokenRepository;
import com.aptech.apiv1.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static com.aptech.apiv1.config.SecurityConstants.REFRESH_TOKEN_EXPIRATION_TIME;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    AdminRepository adminRepository;

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    public RefreshToken createRefreshToken(String email) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setAdmin(adminRepository.findByEmail(email).get());
        refreshToken.setExpiryDate(Instant.now().plusMillis(REFRESH_TOKEN_EXPIRATION_TIME));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(),
                    "Refresh token was expired. Please make a new sign-in request");
        }

        return token;
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    public class TokenRefreshException extends RuntimeException {
        private static final long serialVersionUID = 1L;

        public TokenRefreshException(String token, String message) {
            super(String.format("Failed for [%s]: %s", token, message));
        }
    }

}
