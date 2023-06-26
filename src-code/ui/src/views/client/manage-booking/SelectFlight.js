/* eslint-disable no-unused-vars */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography } from '@mui/material';

import * as React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { isFetchingPnr, selectBookingByPnr } from 'store/booking/booking.selector';
import RadioFlightGroup from './RadioFlightGroup';
// Icon
import SearchBookingForm from 'ui-component/client/SearchBookingForm';
import { useLocation } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import LoadingProgress from 'ui-component/client/LoadingProgress';

const SelectFlight = ({ val, onSelectFlight }) => {
  const location = useLocation();
  const bookings = useSelector(selectBookingByPnr);
  const isFetching = useSelector(isFetchingPnr);

  let searchingPnr = location.state?.searchingPnr;
  let obFlight;
  let ibFlight;
  let flightProps = [];
  if (bookings !== null && bookings.length > 0) {
    const minSTD = Math.min(...bookings.map((b) => Date.parse(b.flight.std)));
    obFlight = bookings.filter((b) => Date.parse(b.flight.std) === minSTD)[0].flight;
    ibFlight = bookings.filter((b) => Date.parse(b.flight?.std) > minSTD)[0]?.flight;
    flightProps = ibFlight !== undefined ? [obFlight, ibFlight] : [obFlight];
  }

  /////// UI
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <Grid marginY={2} container spacing={3} component={'div'} height={500}>
        <Grid item xs={4}>
          <Paper elevation={4} sx={{ height: 500, p: 4, borderRadius: 1 }}>
            Booking Details
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={4} sx={{ height: 500, p: 4, borderRadius: 1 }}>
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
                <RadioFlightGroup flights={flightProps} selectedFlight={val} onFlightChange={onSelectFlight} />
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
                  <DialogContentText id="alert-dialog-description">
                    <SearchBookingForm />
                  </DialogContentText>
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
