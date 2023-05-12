package com.aptech.apiv1.utils.business;

import com.aptech.apiv1.enums.SeatType;

public class SeatUtils {
    public static double getPrice(SeatType type) {
        switch (type) {
            case EXIT, HOTSEAT -> {
                return 4.9;
            }
            case STANDARD -> {
                return 2.2;
            }
            default -> {
                return 0.0;
            }
        }
    }
    public static String getDescription(SeatType type){
        switch (type){
            case STANDARD -> {
                return "Location: Seats from the 6th row and up to the back of the aircraft do not include Legroom seat and Legroom seats next to the exit door." +
                        "Product Description: Passengers can choose their desired seats at a reasonable price.";
            }
            case HOTSEAT -> {
                return "Hot Seats are seats located in the forward cabin or with extra legroom. Xpress Boarding is available for guests who booked Hot Seat (effective 1st January 2022).";
            }
            case EXIT -> {
                return "Location: The seats are right next to the emergency exit on the aircraft (2nd row of the exit row). " +
                        "Description: Passengers can choose seats with wider legroom than the usual seats on the aircraft, passengers must meet the conditions of sitting next to the exit door. " +
                        "Requirements to use extra legroom seats at emergency exit rows. " +
                        "Age from 15 to 65 years old, physically and mentally fit to assist cabin crew in an emergency. " +
                        "Capable of understanding printed/spoken emergency instructions. " +
                        "Not in any stage of pregnancy. " +
                        "Not travelling with infants";
            }
            default -> {
                return "";
            }
        }
    }
}
