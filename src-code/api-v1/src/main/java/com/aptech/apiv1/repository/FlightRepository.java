package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Flight;
import org.springframework.data.repository.CrudRepository;

public interface FlightRepository extends CrudRepository<Flight, Long> {
}
