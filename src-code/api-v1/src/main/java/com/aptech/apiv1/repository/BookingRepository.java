package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BookingRepository extends CrudRepository<Booking, Long>,
                PagingAndSortingRepository<Booking, Long> {
    List<Booking> findBookingByPnr(String pnr);
}