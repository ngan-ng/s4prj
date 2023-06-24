package com.aptech.apiv1.enums;

import java.util.stream.Stream;

public enum IataCode {
    SGN, // Saigon
    THD, // Thanh Hoa
    DAD, // Da Nang
    HAN, // Ha Noi
    PQC, // Phu Quoc
    HPH, // Hai Phong
    TBB, // Tuy Hoa
    UIH; // Qui Nhon
    public static Stream<IataCode> stream() {
        return Stream.of(IataCode.values());
    }
}
