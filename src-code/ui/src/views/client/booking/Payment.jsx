/* eslint-disable no-unused-vars */
import { Button, Grid, Paper, Typography } from '@mui/material';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axiosCall from 'api/callAxios';
import { useDispatch, useSelector } from 'react-redux';
import { selectBookings } from 'store/booking/booking.selector';
import { ReviewPayPal } from './paypal/ReviewPayPal';
import { Fragment } from 'react';
import { isClickPayment } from 'store/booking/booking.action';

const Payment = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectBookings);
  console.log(bookings);

  const objBooking = { bookings: [] };
  console.log(objBooking);

  bookings.map((item, index) => {
    let obj = {
      loadSeatDto: { id: 0, seatNumber: '', price: 0, bookingId: item.id },
      pnr: item.pnr,
      flight: { ...item.flight, basePrice: 0.01, id: item.flight.id },
      id: item.id,
      dob: item.dob,
      title: item.title,
      firstName: item.firstName,
      lastName: item.lastName,
      gender: item.gender,
      mobile: item.mobile,
      email: item.email,
      bag_allowance: 0.0
    };
    objBooking.bookings.push(obj);
  });

  const handleCheckout = async () => {
    try {
      dispatch(isClickPayment());
      const resp = await axiosCall.post('/api-v1/guest/payment/checkout-paypal', objBooking);
      console.log(resp.data);
      if (resp.status === 200) {
        console.log(resp.data);
        window.location.replace(resp.data);
      } else {
        navigate('/error-paypal', { state: { errMess: resp.data } });
      }
    } catch (error) {
      navigate('/error-paypal', { state: { errMess: error } });
      //console.log(error);
    }
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ py: 3 }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 1 }}>
          <Typography align="center" variant="h3" sx={{ pb: 3 }}>
            Choose your payment
          </Typography>
          <PayPalButtons onClick={handleCheckout}></PayPalButtons>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Payment;
