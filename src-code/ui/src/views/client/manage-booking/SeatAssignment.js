import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { Fragment, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBookingByPnr } from 'store/booking/booking.selector';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';
import { fetchSeatsStart } from 'store/seat/seat.action';
import { isFetchingSeats, selectSeats } from 'store/seat/seat.selector';
import Seatmap from 'ui-component/client/Seatmap';

const SeatAssignment = () => {
  const dispatch = useDispatch();
  const seats = useSelector(selectSeats);
  const isFetching = useSelector(isFetchingSeats);
  const selectMBObj = useSelector(selectManageBookingObj);
  const bookings = useSelector(selectBookingByPnr);

  useEffect(() => {
    async function getSeats() {
      dispatch(fetchSeatsStart(selectMBObj.flightId));
    }
    if (seats === null || seats.length === 0) {
      if (!isFetching) {
        getSeats();
      }
    }
  }, [dispatch, isFetching, seats, selectMBObj.flightId]);

  const ref = useRef(null);
  const [heightRef, setHeightRef] = useState(0);
  useLayoutEffect(() => {
    setHeightRef(ref.current.offsetHeight);
  }, []);
  return (
    <Fragment>
      <Grid direction={{ xs: 'column-reverse', md: 'row' }} marginY={2} container spacing={2} component={'div'} height="stretch">
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ height: { xs: 'stretch', md: heightRef > 200 ? heightRef : 'stretch' }, p: 4, borderRadius: 1 }}>
            Passengers
            <ul>
              {bookings
                .filter((b) => Object.hasOwn(selectMBObj.pax, b.id.toString()))
                .map((p) => (
                  <Typography key={p.id.toString()}>{p.firstName}</Typography>
                ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper ref={ref} elevation={4} sx={{ height: 'stretch', p: 5, borderRadius: 1 }}>
            <Box height={580}>
              <Seatmap seats={seats} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SeatAssignment;
