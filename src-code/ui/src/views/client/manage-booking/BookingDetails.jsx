/* eslint-disable no-unused-vars */
import { Button, Grid } from '@mui/material';
import axiosCall from 'api/callAxios';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectBookingByPnr } from 'store/booking/booking.selector';
import { selectSeats } from 'store/seat/seat.selector';

const BookingDetails = ({ unpaid }) => {
  // const bookings = useSelector(selectBookingByPnr);
  // const seats = useSelector(selectSeats);
  // useEffect(() => {
  //   const getPaymentsByBookings = async () => {
  //     const bookingIds = bookings?.map((b) => b.id);
  //   };

  //   getPaymentsByBookings();
  // }, []);
  // const handlePayment = async () => {
  //   try {
  //     if (unpaid && bookings?.length > 0) {
  //       const coreArray = bookings.map((b) => {
  //         let obj = {
  //           loadSeatDto: { id: 0, seatNumber: '', price: 0, bookingId: 0 },
  //           id: b.id,
  //           pnr: b.pnr,
  //           flight: b.flight,
  //           firstName: b.firstName,
  //           lastName: b.lastName,
  //           infant: b.infant,
  //           gender: b.gender,
  //           bagAllowance: b.bagAllowance,
  //           email: b.email
  //         };
  //         return obj;
  //       });
  //       console.log(coreArray);
  //       const groupBookingPaymentDto = { bookings: coreArray };
  //       console.log(groupBookingPaymentDto);
  //       const resp = await axiosCall.post('/api-v1/guest/payment/checkout-paypal', groupBookingPaymentDto);
  //       if (resp.status === 200) {
  //         console.log(resp.data);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Grid container>
      <Grid item>{unpaid && <Button onClick={handlePayment}>Paynow</Button>}</Grid>
    </Grid>
  );
};

export default memo(BookingDetails);
