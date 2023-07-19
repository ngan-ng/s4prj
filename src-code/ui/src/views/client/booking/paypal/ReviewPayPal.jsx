/* eslint-disable no-unused-vars */
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleReview from './SingleReview';
import axiosCall from 'api/callAxios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompletedPaypalStart } from 'store/itinerary/itinerary.action';
import { selectBookings } from 'store/booking/booking.selector';

export const ReviewPayPal = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const paymentId = queryParameters.get('paymentId');
  console.log(paymentId);
  const payerId = queryParameters.get('PayerID');
  console.log(payerId);
  const [reviews, setReviews] = useState({});
  const navigate = useNavigate();
  const [totalAmountText, setTotalAmountText] = useState('');
  const [taxText, setTaxText] = useState('');
  const dispatch = useDispatch();

  let count = 0;
  useEffect(() => {
    const review = async () => {
      if (count < 1) {
        const resp = await axiosCall.get(`/api-v1/guest/payment/review-paypal?paymentId=${paymentId}&PayerID=${payerId}`);
        console.log(resp);
        dispatch(fetchCompletedPaypalStart(resp));
        if (resp.status === 200) {
          setReviews(resp.data);
        }
         //console.log(`Reviews: ${reviews.reviewDtos}`);
      }
    };

    if (count < 1) {
      review();
      console.log(count);
    }
    count++;
  }, []);

  const handlePaynow = async () => {
    const executePaypalRequest = {
      paymentId: paymentId,
      payerId: payerId
    };
    try {
      const resp = await axiosCall.post('/api-v1/guest/payment/execute-paypal', executePaypalRequest);
      if (resp.status === 200) {
        //console.log(resp.data);
        navigate('/booking', { state: { activeStep: 4 } });
      }
    } catch (error) {
      navigate('/error-paypal', { state: { errMess: error } });
    }
    // console.log(resp.data);
  }; // End handlePaynow

  return (
    <Fragment>
      <Container>
        <Paper sx={{ padding: '20px' }}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography align="center" variant="h3">
                Please Review Before Paying
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography align="center" variant="h3">
                Transaction Details:
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={6}>
                  <Paper sx={{ p: 2 }} variant="outlined">
                    {reviews?.reviewDtos?.map((r, index) => {
                      return (
                        <Grid key={index}>
                          {/* Payment Details */}
                          <SingleReview props={r} />
                        </Grid>
                      );
                    })}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">Total Amount:</Typography>
                      <Typography variant="body1">{`$${reviews?.amount?.total} ${reviews?.amount?.currency}` ?? ' ...loading'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">Tax (inclusive):</Typography>
                      <Typography variant="body1">
                        {`$${reviews?.amount?.details?.tax} ${reviews?.amount?.currency}` ?? '...loading'}
                      </Typography>{' '}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item md={6} xs={6}>
                  <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">Summary</Typography>
                      <Typography variant="body1">{`$${reviews?.amount?.details?.tax} ${reviews?.amount?.currency}`}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} xs={12}>
              <Button
                onClick={handlePaynow}
                variant="contained"
                //   disabled={!validation.isValid}
              >
                Pay now
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};
