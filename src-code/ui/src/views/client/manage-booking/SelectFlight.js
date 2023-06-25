/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  LinearProgress,
  Paper,
  Typography
} from '@mui/material';

import * as React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isFetchingPnr, selectBookingByPnr } from 'store/booking/booking.selector';
import RadioFlightGroup from './RadioFlightGroup';
import { useEffect } from 'react';
// Icon
import { ReactComponent as LoadingFlightIcon } from 'assets/images/icons/animate-loading-flight.svg';
import SearchBookingForm from 'ui-component/client/SearchBookingForm';
import { useLocation } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { mb_selectFlightSuccess } from 'store/manage-booking/mb.action';
import { useCallback } from 'react';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';

const SelectFlight = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const bookings = useSelector(selectBookingByPnr);
  const isFetching = useSelector(isFetchingPnr);
  let selectMBObj = useSelector(selectManageBookingObj);
  const MB_INITIAL_OBJ = {
    flightId: 0,
    pax: [],
    seats: []
  };
  selectMBObj = selectMBObj ?? MB_INITIAL_OBJ;
  const [mbObj, setMBObj] = useState(selectMBObj);

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

  const chooseFlight = useCallback(async () => {
    try {
      dispatch(mb_selectFlightSuccess(mbObj));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, mbObj]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      chooseFlight();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [chooseFlight, mbObj]);
  const handleSelectFlight = (e) => {
    setMBObj((prev) => ({
      ...prev,
      flightId: e.target.value
    }));
  };

  /////// UI
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    console.log(searchingPnr);
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [searchingPnr]);
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
                <>
                  <LinearProgress color="secondary" value={progress} />
                  <Box boxSizing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <LoadingFlightIcon />
                  </Box>
                </>
              ) : bookings && bookings.length > 0 ? (
                <RadioFlightGroup flights={flightProps} onFlightChange={handleSelectFlight} />
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
