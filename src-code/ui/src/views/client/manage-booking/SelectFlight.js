/* eslint-disable no-unused-vars */
import { FormControl, FormLabel, Grid, Paper, Typography } from '@mui/material';

import * as React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectPnr } from 'store/booking/booking.selector';
import RadioFlightGroup from './RadioFlightGroup';

const SelectFlight = () => {
  const bookings = useSelector(selectPnr);
  const minSTD = Math.min(...bookings.map((b) => Date.parse(b.flight.std)));
  const obFlight = bookings.filter((b) => Date.parse(b.flight.std) === minSTD)[0].flight;
  const ibFlight = bookings.filter((b) => Date.parse(b.flight.std) > minSTD)[0].flight;
  const [currentFlight, setCurrentFlight] = useState(obFlight.id);

  // eslint-disable-next-line no-unused-vars
  const handleSelectFlight = (e) => {
    console.log(e.target.value);
    setCurrentFlight(e.target.value);
  };

  return (
    <Fragment>
      <Grid marginY={2} container spacing={3} component={'div'} height={500}>
        <Grid item xs={4}>
          <Paper elevation={4} sx={{ height: 500, p: 3, borderRadius: 1 }}>
            Booking Details
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={4} sx={{ height: 500, p: 3, borderRadius: 1 }}>
            <Typography variant="h3" sx={{ mb: 1 }}>
              Choose your flight
            </Typography>
            <RadioFlightGroup flights={[obFlight, ibFlight]} onBtnChange={handleSelectFlight} />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SelectFlight;
