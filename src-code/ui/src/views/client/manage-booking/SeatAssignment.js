import { Box, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material';
import React, { Fragment, useState, useRef, useEffect, useLayoutEffect } from 'react';
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
  const [paxInAction, setPaxInAction] = useState(Object.keys(selectMBObj.pax)[0]);
  function handleChooseSeat(seat) {
    let selectSeatDto = {
      id: seat.id,
      bookingId: paxInAction,
      action: 'select'
    };
    console.log(selectSeatDto);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      async function getSeats() {
        dispatch(fetchSeatsStart(selectMBObj.flightId));
      }
      if (seats === null || seats.length === 0) {
        if (!isFetching) {
          getSeats();
        }
      }
    });
    return () => clearTimeout(timeout);
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
            <FormControl>
              <FormLabel id="paxInAction">Passengers</FormLabel>
              <RadioGroup
                defaultValue={paxInAction}
                name="paxInAction"
                value={paxInAction}
                onChange={(e) => setPaxInAction(e.target.value)}
              >
                {bookings
                  .filter((b) => Object.hasOwn(selectMBObj.pax, b.id))
                  .map((p) => (
                    <FormControlLabel control={<Radio />} value={p.id} key={p.id.toString()} label={p.firstName} />
                  ))}
              </RadioGroup>
            </FormControl>
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
