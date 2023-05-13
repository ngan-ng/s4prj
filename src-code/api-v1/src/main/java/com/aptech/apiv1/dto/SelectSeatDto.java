package com.aptech.apiv1.dto;

import lombok.Getter;

import java.io.Serializable;
@Getter
public class SelectSeatDto implements Serializable {
    private long id;
    private long bookingId;
    private String action;
}
