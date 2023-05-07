package com.aptech.apiv1.enums;

public enum AirportName {
    TANSANNHAT("Tan San Nhat Airport"),
    DANANG("Da Nang Airport"),
    TUYHOA("Tuy Hoa Airport"),
    HANOI("Noi Bai Airport");
    private String key;
    private AirportName(String key) { this.key = key; }
    public String toString() { return key; }

}
