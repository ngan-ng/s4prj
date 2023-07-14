/* eslint-disable no-unused-vars */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography } from '@mui/material';

import React, { Fragment, useState, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { isFetchingPnr, selectBookingByPnr } from 'store/booking/booking.selector';
import RadioFlightGroup from './RadioFlightGroup';
// Icon
import SearchBookingForm from 'ui-component/client/SearchBookingForm';
import { useLocation } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import LoadingProgress from 'ui-component/client/LoadingProgress';
import { useEffect } from 'react';
import BookingDetails from './BookingDetails';

const SelectFlight = () => {
  const location = useLocation();
  const bookings = useSelector(selectBookingByPnr);
  const isFetching = useSelector(isFetchingPnr);

  const searchingPnr = location.state?.searchingPnr;
  let obFlight;
  let ibFlight;
  let flightProps;

  if (bookings !== undefined && bookings !== null && bookings.length > 0) {
    const minSTD = Math.min(...bookings.map((b) => Date.parse(b.flight.std)));
    obFlight = bookings?.filter((b) => Date.parse(b.flight.std) === minSTD)[0].flight;
    ibFlight = bookings?.filter((b) => Date.parse(b.flight?.std) > minSTD)[0]?.flight ?? null;
    flightProps = ibFlight !== undefined || ibFlight !== null ? [obFlight, ibFlight] : [obFlight];
  }
  const unpaid = bookings?.filter((b) => b?.status === 'UNPAID').length > 0;
  /////// UI
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Set 2 columns with the same height
  const ref = useRef(null);
  const [heightRef, setHeightRef] = useState(0);
  useLayoutEffect(() => {
    setHeightRef(ref?.current?.clientHeight);
  }, []);
  return (
    <Fragment>
      <Grid marginY={2} container spacing={3} component={'div'} height="stretch">
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ height: { xs: 'stretch', md: heightRef }, p: 4, borderRadius: 1 }}>
            <BookingDetails unpaid={unpaid} />
          </Paper>
        </Grid>
        <Grid style={{ pointerEvents: unpaid ? 'none' : '' }} item xs={12} md={8}>
          <Paper ref={ref} elevation={4} sx={{ height: 'stretch', p: 4, borderRadius: 1 }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                bgcolor: 'background.paper',
                borderRadius: 1
              }}
            >
              <Typography variant="h3">Choose your flight</Typography>
              {isFetching ? (
                <LoadingProgress props={isFetching} />
              ) : bookings && bookings.length > 0 ? (
                <RadioFlightGroup flights={flightProps} />
              ) : (
                <div>
                  <Typography sx={{ fontSize: 20 }}>Sorry, we cannot find any booking with your PNR: {'"' + searchingPnr + '"'}</Typography>
                </div>
              )}
              <Button color="secondary" size="large" sx={{ height: 46 }} variant="outlined" onClick={handleDialogOpen}>
                Search PNR <Search />
              </Button>
              <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                maxWidth="lg"
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                  <SearchBookingForm />
                </DialogContent>
                <DialogActions>
                  <Button color="error" onClick={handleDialogClose}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SelectFlight;
