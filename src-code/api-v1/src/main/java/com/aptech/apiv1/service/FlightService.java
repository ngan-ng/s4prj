package com.aptech.apiv1.service;

import com.aptech.apiv1.dto.SearchRequestDto;
import com.aptech.apiv1.dto.SearchResponseDto;
import com.aptech.apiv1.model.Flight;

import java.util.List;

public interface FlightService {
    Flight create(Flight flight);
    SearchResponseDto searchFlight(SearchRequestDto searchDto) throws Exception;
}
