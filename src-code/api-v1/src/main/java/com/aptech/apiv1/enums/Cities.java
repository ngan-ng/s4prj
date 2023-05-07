package com.aptech.apiv1.enums;

public enum Cities {
    HCM("Ho Chi Minh City"),
    HANOI("Ha Noi Capital");
    private String key;
    private Cities(String key) { this.key = key; }
    public String toString() { return key; }
}
