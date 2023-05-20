package com.aptech.apiv1.utils.business;

import com.aptech.apiv1.dto.GroupBookingPaymentDto;
import com.aptech.apiv1.model.Booking;

import java.util.List;
import java.util.UUID;

public class PnrGenerator {
    public static void generateAndSetPnr(List<Booking> bookings) {
        String pnr = getPnr();
        bookings.forEach(b -> b.setPnr(pnr));
    }
//    public static void generateAndSetPnr(GroupBookingPaymentDto bookings) {
//        String pnr = getPnr();
//        bookings.getBookings().forEach(b -> b.setPnr(pnr));
//    }
    private static String getPnr() {
        return UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
}