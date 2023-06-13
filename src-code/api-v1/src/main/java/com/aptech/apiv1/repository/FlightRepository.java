package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Airport;
import com.aptech.apiv1.model.Flight;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository extends JpaRepositoryImplementation<Flight, Long> {
    List<Flight> findAllByOriginAndDestinationAndSTDBetween(Airport origin, Airport destination, LocalDateTime STD, LocalDateTime STD2);
}
