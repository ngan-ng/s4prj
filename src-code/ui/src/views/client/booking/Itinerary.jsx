/* eslint-disable no-unused-vars */
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCompletedPaypal } from 'store/itinerary/itinerary.selector';
import dayjs from 'dayjs';
import SingleReview from './paypal/SingleReview';

const Itinerary = () => {
  const completedPaypal = useSelector(selectCompletedPaypal);
  console.log(completedPaypal);

  let arrFullname = completedPaypal.reviewDtos.map((item, index) => {
    return `${item.booking.firstName} ${item.booking.lastName}`;
  });

  let unique = [...new Set(arrFullname)];
  console.log(unique);

  let arrObj = [];
  for (let item of unique) {
    let obj = {
      fullName: item
    };
    arrObj.push(obj);
  }

  return (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 1 }}>
      <Grid container direction="column" sx={{ py: 3 }}>
        <Grid item container xs={12} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3">YOUR TICKET-ITINERARY</Typography>
          </Grid>
          <Grid item container xs={12} md={6} justifyContent="flex-end" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h3">YOUR BOOKING NUMBER:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  pl: 3,
                  pr: 3,
                  py: 1.5,
                  ml: 1,
                  width: 100,
                  height: 40,
                  backgroundColor: '#d6c0fc',
                  borderRadius: 0.5,
                  fontWeight: 'bold'
                }}
              >
                {completedPaypal.reviewDtos[0].booking.pnr}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item md={1}>
              <Typography align="left" variant="h4">
                Flight
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography align="left" variant="h4">
                From
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography align="left" variant="h4">
                To
              </Typography>
            </Grid>
            <Grid item md={1}>
              <Typography align="left" variant="h4">
                Aircraft
              </Typography>
            </Grid>
            <Grid item md>
              <Typography align="left" variant="h4">
                Class/Status
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {completedPaypal.reviewDtos.slice(0, 2).map((item, index) => (
            <Grid key={index} item container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item md={1}>
                <Typography align="left" sx={{ pb: 3 }}>
                  FS {item.booking.flight.flightNumber}
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography align="left" sx={{ pb: 3 }}>
                  {item.booking.flight.origin.location} ({item.booking.flight.origin.iata_code}){' '}
                  {dayjs(item.booking.flight.std).format('HH:mm ddd D-MMM-YYYY')}
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography align="left" sx={{ pb: 3 }}>
                  {item.booking.flight.destination.location} ({item.booking.flight.destination.iata_code}){' '}
                  {dayjs(item.booking.flight.std).format('HH:mm ddd D-MMM-YYYY')}
                </Typography>
              </Grid>
              <Grid item md={1}>
                <Typography align="left" sx={{ pb: 3 }}>
                  {item.booking.flight.aircraft.type}
                </Typography>
              </Grid>
              <Grid item md>
                <Typography align="left" sx={{ pb: 3 }}>
                  Y Confirmed
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Grid item container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item md={3}>
              <Typography align="left" variant="h4">
                Passenger Name
              </Typography>
            </Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
          </Grid>
        </Grid>
        <Grid item>
          {arrObj.map((item, index) => (
            <Grid item key={index} container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item md={3}>
                <Typography align="left">
                  ({index + 1}) {item.fullName}
                </Typography>
              </Grid>
              <Grid item md></Grid>
              <Grid item md></Grid>
              <Grid item md></Grid>
              <Grid item md></Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Grid item container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item md={6}>
              <Grid item container direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item md={12}>
                  <Typography align="center" variant="h3" sx={{ pb: 3 }}>
                    Purchase Description
                  </Typography>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <Paper sx={{ p: 2 }} variant="outlined">
                          {completedPaypal?.reviewDtos?.map((r, index) => {
                            return (
                              <Grid key={index}>
                                {/* Payment Details */}
                                <SingleReview props={r} />
                              </Grid>
                            );
                          })}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1">Total Amount:</Typography>
                            <Typography variant="body1">
                              {`$${completedPaypal?.amount?.total} ${completedPaypal?.amount?.currency}` ??
                                ' ...loading'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1">Tax (inclusive):</Typography>
                            <Typography variant="body1">
                              {`$${completedPaypal?.amount?.details?.tax} ${completedPaypal?.amount?.currency}` ??
                                '...loading'}
                            </Typography>{' '}
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1">Summary</Typography>
                            <Typography variant="body1">{`$${completedPaypal?.amount?.total} ${completedPaypal?.amount?.currency}`}</Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item md={6}>
                  <Typography align="center" variant="h3" sx={{ pb: 3 }}>
                    Price
                  </Typography>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Typography align="center" variant="h3" sx={{ pb: 3 }}>
                Ticket is non-endorsable, non-refundable. Please read carefully all fare restrictions. Have a pleasant
                flight! Paid by Paypal
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Itinerary;
