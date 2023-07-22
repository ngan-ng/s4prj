package com.aptech.apiv1.utils.business;

import com.aptech.apiv1.enums.Gender;

public class TaxUtils {
    public static double getAirportTax(Gender gender) {
        double rateVndToUsd = 0.000043;
        double tax = 0;
        switch (gender) {
            case ADL -> {
                tax = 120000 * rateVndToUsd;
            }
            case CHD -> {
                tax = 70000 * rateVndToUsd;
            }
            case INF -> {
                tax = 100000 * rateVndToUsd;
            }
        }
        return tax;
        //return 0;
    }
}
