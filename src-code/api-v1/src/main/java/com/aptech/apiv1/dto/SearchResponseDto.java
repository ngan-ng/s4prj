package com.aptech.apiv1.dto;

import com.aptech.apiv1.model.Flight;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
@Setter
@Getter
public class SearchResponseDto implements Serializable {
    List<Flight> outboundFlights = new ArrayList<>();
    List<Flight> inboundFlights = new ArrayList<>();
}
