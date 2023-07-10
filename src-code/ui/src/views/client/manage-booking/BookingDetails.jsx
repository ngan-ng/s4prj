import { Grid } from '@mui/material';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectBookingByPnr } from 'store/booking/booking.selector';

const BookingDetails = () => {
  const bookings = useSelector(selectBookingByPnr);
  useEffect(() => {
    const getPaymentsByBookings = async () => {
      const bookingIds = bookings?.map((b) => b.id);
      console.log(bookingIds);
    };

    getPaymentsByBookings();
  }, []);
  return (
    <Grid container>
      <Grid item></Grid>
    </Grid>
  );
};

export default memo(BookingDetails);
