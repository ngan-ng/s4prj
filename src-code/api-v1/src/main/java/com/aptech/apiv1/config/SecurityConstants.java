package com.aptech.apiv1.config;

public interface SecurityConstants {

    String SECRET = "jBq8Q~FXUJ90sGBeDGpT5~0KyMoOIhXofoeZMa_z";
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
    //String SIGN_UP_URL = "/users/sign-up";
    long TOKEN_EXPIRATION_TIME = 300_000;
    long REFRESH_TOKEN_EXPIRATION_TIME = 432_000_000;
}
