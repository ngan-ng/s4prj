/* eslint-disable no-unused-vars */
import { Box, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Snackbar, Typography } from '@mui/material';
import axiosCall from 'api/callAxios';
import dayjs from 'dayjs';
import React, { Fragment, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { forwardRef } from 'react';
import { useCallback } from 'react';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { selectBookingByPnr } from 'store/booking/booking.selector';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';
import { fetchSeatsStart, updateSeatSuccess } from 'store/seat/seat.action';
import { isFetchingSeats, selectSeats } from 'store/seat/seat.selector';
import Seatmap from 'ui-component/client/Seatmap';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SeatAssignment = () => {
  const dispatch = useDispatch();
  const seats = useSelector(selectSeats);
  const isFetching = useSelector(isFetchingSeats);
  const selectMBObj = useSelector(selectManageBookingObj);
  const managingPax = selectMBObj.pax;
  const bookings = useSelector(selectBookingByPnr);
  const mySeats = seats.filter(
    (s) => managingPax.includes(parseInt(s.bookingId)) && (Date.now() - new Date(s.selectedAt)) / (60 * 1000) < 10
  );

  // get the first None-Seat pax (pax have null seat-assignment)
  let initial_paxInAaction = managingPax.filter((pId) => mySeats.filter((s) => s.bookingId == pId)[0]?.bookingId != pId)[0];
  const [currentPaxId, setCurrentPaxId] = useState(initial_paxInAaction === undefined ? 0 : initial_paxInAaction);
  const isReservedTempWithinTenMinutes = useCallback((status, selectedAt) => {
    if (status === 'TEMP') {
      if ((Date.now() - new Date(selectedAt)) / (60 * 1000) < 10) {
        return true;
      }
    }
    return false;
  }, []);
  const handleChooseSeat = async (seat) => {
    const start = Date.now();
    handleOpenSnackbar();
    try {
      let txtAction = '';
      let txtSeatId = seat.id;
      let prevSeat = seats.find((s) => s.bookingId == currentPaxId);
      if (prevSeat?.bookingId == seat.bookingId) {
        // THIS SEAT IS BEING OWNED BY THIS BOOKING (PAX)
        // THIS BOOKING IS AUTHORIZED TO MODIFY THIS SEAT
        if (isReservedTempWithinTenMinutes(seat.status, seat.selectedAt)) {
          txtAction = 'unselect';
        } else {
          txtAction = 'select';
        }
      } else {
        if (isReservedTempWithinTenMinutes(seat.status, seat.selectedAt)) {
          alert('This seat is reserved');
          getSeats();
          return;
        }
        if (prevSeat === undefined) {
          // Select Seat at First time
          txtAction = 'select';
        } else {
          // ALREADY OWNING A SEAT
          // CALL API unselect the previous Seat before select the new one
          handleSeatApi({ id: prevSeat.id, bookingId: currentPaxId, action: 'unselect' });
          console.log('Outside handleAPI');
          const preIndex = seats.findIndex((s) => s.id == prevSeat.id);
          seats[preIndex] = { ...prevSeat, selectedAt: null, status: 'AVAILABLE', bookingId: 0 };
          txtAction = 'select';
        }
      }
      let selectSeatDto = {
        id: txtSeatId,
        bookingId: currentPaxId,
        action: txtAction
      };

      const resp = await handleSeatApi(selectSeatDto);
      switch (resp.status) {
        case 200:
        case 201: {
          console.log(resp.data);
          if (txtAction === 'unselect') {
            let index = seats.findIndex((s) => s.id == txtSeatId);
            seats[index] = { ...seats[index], selectedAt: null, status: 'AVAILABLE', bookingId: 0 };
          } else {
            let selectedAt = dayjs().format('YYYY-MM-DDTHH:mm');
            let index = seats.findIndex((s) => s.id == txtSeatId);
            seats[index] = { ...seats[index], selectedAt: selectedAt, status: 'TEMP', bookingId: currentPaxId };
          }
          // console.log(seats);
          dispatch(updateSeatSuccess(seats));
          console.log('END IN: ');
          console.log(Date.now() - start);
          break;
        }
        default:
          console.log(resp.data);
          break;
      }
    } catch (error) {
      getSeats();
      alert('Something happens. Please try again later!');
      console.log(error);
    }
  };

  const handleSeatApi = useCallback(async (selectSeatDto) => {
    console.log('inside handleSeatApi');
    return await axiosCall.post('/api-v1/guest/seat/handle', selectSeatDto);
  }, []);

  const getSeats = useCallback(async () => {
    dispatch(fetchSeatsStart(selectMBObj.flightId));
  }, [dispatch, selectMBObj.flightId]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (seats === null || seats.length === 0) {
        if (!isFetching) {
          getSeats();
        }
      }
    });
    return () => clearTimeout(timeout);
  }, [dispatch, getSeats, isFetching, seats, selectMBObj.flightId]);

  const ref = useRef(null);
  const [heightRef, setHeightRef] = useState(0);
  useLayoutEffect(() => {
    setHeightRef(ref.current.offsetHeight);
  }, []);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <Fragment>
      <Grid direction={{ xs: 'column-reverse', md: 'row' }} marginY={2} container spacing={2} component={'div'} height="stretch">
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ height: { xs: 'stretch', md: heightRef > 200 ? heightRef : 'stretch' }, p: 4, borderRadius: 1 }}>
            <FormControl fullWidth>
              <FormLabel id="currentPaxId">Passengers</FormLabel>
              <RadioGroup
                defaultValue={currentPaxId}
                name="currentPaxId"
                value={currentPaxId}
                onChange={(e) => setCurrentPaxId(e.target.value)}
              >
                {bookings
                  .filter((b) => managingPax.includes(b.id))
                  .map((b) => (
                    <Box key={b.id} direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <FormControlLabel
                        disabled={mySeats.find((seat) => seat.bookingId == b.id)?.status === 'OCCUPIED'}
                        control={<Radio />}
                        value={b.id}
                        key={b.id}
                        label={b.firstName + ', ' + b.lastName}
                      />
                      <Typography>{mySeats.find((seat) => seat.bookingId == b.id)?.seatNumber}</Typography>
                    </Box>
                  ))}
              </RadioGroup>
            </FormControl>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                This is a success message!
              </Alert>
            </Snackbar>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper ref={ref} elevation={4} sx={{ height: 'stretch', p: 2, borderRadius: 1 }}>
            <Box height={600}>
              <Seatmap seats={seats} onHandleSeat={handleChooseSeat} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SeatAssignment;
