package com.aptech.apiv1.repository;

import com.aptech.apiv1.model.Booking;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface BookingRepository extends JpaRepositoryImplementation<Booking, Long> {
    List<Booking> findBookingByPnr(String pnr);
    @Query("select max(b.seq) from Booking b where b.flight.id = :flightId")
    int findMaxSeq(long flightId);
}