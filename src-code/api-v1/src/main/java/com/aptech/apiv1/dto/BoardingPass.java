package com.aptech.apiv1.dto;

import com.aptech.apiv1.model.Airport;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class BoardingPass implements Serializable {
    private String fullName;
    private Airport origin;
    private Airport destination;
    private String flightNumber;
    private String date;
    private String time;
    private String seatNumber;
    private String pnr;
    private String gate;
    private int seq;
    private String bagtags = "";
}
