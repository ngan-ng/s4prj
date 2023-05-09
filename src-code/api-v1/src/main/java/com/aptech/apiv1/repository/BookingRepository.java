package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookingRepository extends CrudRepository<Booking, Long>,
                PagingAndSortingRepository<Booking, Long> {}
