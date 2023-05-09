package com.aptech.apiv1.utils.strings;

import com.aptech.apiv1.enums.IataCode;

public class IataCodeUtils {
    public static String getAirport(IataCode iataCode) {
        switch (iataCode) {
            case SGN:
                return "Tan San Nhat International Airport";
            case HAN:
                return "Noi Bai International Airport";
            case DAD:
                return "Da Nang International Airport";
            case HPH:
                return "Cat Bi International Airport";
            case PQC:
                return "Phu Quoc International Airport";
            case TBB:
                return "Tuy Hoa Airport";
            case THD:
                return "Tho Xuan Airport";
            case UIH:
                return "Phu Cat Airport";
            default:
                return "Unknown";
        }
    }
    public static String getLocation(IataCode iataCode) {
        switch (iataCode) {
            case SGN:
                return "Ho Chi Minh";
            case HAN:
                return "Ha Noi";
            case DAD:
                return "Da Nang";
            case HPH:
                return "Hai Phong";
            case PQC:
                return "Phu Quoc";
            case TBB:
                return "Phu Yen";
            case THD:
                return "Thanh Hoa";
            case UIH:
                return "Quy Nhon";
            default:
                return "Unknown";
        }
    }
}
