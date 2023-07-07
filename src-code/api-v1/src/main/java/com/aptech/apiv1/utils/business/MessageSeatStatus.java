package com.aptech.apiv1.utils.business;

import org.springframework.http.HttpStatus;

public class MessageSeatStatus {
    public static String selectSeatStatus(HttpStatus code){
        return switch (code) {
            case NOT_FOUND -> "Seat or your booking is not found";
            case SERVICE_UNAVAILABLE -> "Reserved";
            case METHOD_NOT_ALLOWED -> "Not authorized to perform";
            case CONFLICT -> "Seat and your booking are not on the same flight";
            case EXPECTATION_FAILED -> "Cannot select this seat";
            case ACCEPTED -> "Already done";
            case OK -> "Successful";
            default -> "Bad request";
        };
    }
}
