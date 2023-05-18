package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Aircraft;
import org.springframework.data.repository.CrudRepository;

public interface AircraftRepository extends CrudRepository<Aircraft, Long> { }
