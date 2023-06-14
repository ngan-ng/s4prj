package com.aptech.apiv1.service.impl;

import com.aptech.apiv1.dto.SearchRequestDto;
import com.aptech.apiv1.dto.SearchResponseDto;
import com.aptech.apiv1.model.Airport;
import com.aptech.apiv1.model.Flight;
import com.aptech.apiv1.repository.AirportRepository;
import com.aptech.apiv1.repository.FlightRepository;
import com.aptech.apiv1.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FlightServiceImpl implements FlightService {
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private AirportRepository airportRepository;

    @Override
    public Flight create(Flight flight) {
        return null;
    }

    @Override
    public SearchResponseDto searchFlight(SearchRequestDto searchDto) throws Exception {
        Optional<Airport> origin = airportRepository.findById(searchDto.getOrigin());
        Optional<Airport> destination = airportRepository.findById(searchDto.getDestination());
        if (origin.isEmpty() || destination.isEmpty()) {
            throw new Exception("Not Found");
        }
        SearchResponseDto responseDto = new SearchResponseDto();
        LocalDateTime departDate = searchDto.getDepartDate().atTime(0, 0);
        LocalDateTime returnDate = searchDto.getReturnDate().atTime(0, 0);

        List<Flight> outboundFlights = flightRepository
                .findAllByOriginAndDestinationAndSTDBetween(
                        origin.get(),
                        destination.get(),
                        departDate,
                        departDate.plusDays(1));
        responseDto.setOutboundFlights(outboundFlights);

        if (searchDto.getTripType().equalsIgnoreCase("roundtrip")) {
            List<Flight> inboundFlights = flightRepository
                    .findAllByOriginAndDestinationAndSTDBetween(
                            destination.get(),
                            origin.get(),
                            returnDate,
                            returnDate.plusDays(1));
            responseDto.setInboundFlights(inboundFlights);
        }
        return responseDto;
    }

}
