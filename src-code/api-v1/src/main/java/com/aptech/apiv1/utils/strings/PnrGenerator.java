package com.aptech.apiv1.utils.strings;

import java.util.UUID;

public class PnrGenerator {
    public static String generatePnr(){
        return UUID.randomUUID().toString().substring(0,6).toUpperCase();
    }
}