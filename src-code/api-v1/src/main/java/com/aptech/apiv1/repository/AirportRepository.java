package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Airport;
import org.springframework.data.repository.CrudRepository;

public interface AirportRepository extends CrudRepository<Airport, String> {
}
