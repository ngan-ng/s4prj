package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> { }
