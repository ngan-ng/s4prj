package com.aptech.apiv1.utils.business;

import com.aptech.apiv1.enums.IataCode;

import java.util.UUID;

public class BagTagGenerator {
    public static String getBagTagNo(IataCode dest){
        return  dest.toString()+UUID.randomUUID().toString().substring(0,9);
    }
}
