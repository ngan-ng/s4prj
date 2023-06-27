/* eslint-disable no-unused-vars */
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBookingByPnr } from 'store/booking/booking.selector';
import { mb_selectPax } from 'store/manage-booking/mb.action';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';

const SelectPax = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectBookingByPnr);
  const selectMBObj = useSelector(selectManageBookingObj);
  // Filter only passengers on the selected flight for managing booking
  const paxOfFlight = bookings.filter((b) => b.flight.id == selectMBObj.flightId);
  const [allSelect, setAllSelect] = useState(false);
  const [intermediate, setIntermediate] = useState(false);

  useEffect(() => {
    let numOfSelectedPax = Object.keys(selectMBObj.pax).length;
    // console.log(numOfSelectedPax);
    if (numOfSelectedPax === paxOfFlight.length) {
      setAllSelect(true);
      setIntermediate(false);
    } else if (numOfSelectedPax === 0) {
      setAllSelect(false);
      setIntermediate(false);
    } else {
      setIntermediate(true);
    }
  }, [allSelect, paxOfFlight, selectMBObj]);

  const handleChange = (e) => {
    let newPax = selectMBObj.pax;
    if (e.target.checked) {
      newPax[e.target.name] = null;
    } else {
      delete newPax[e.target.name];
    }
    dispatch(mb_selectPax(newPax));
  };
  const handleChangeAll = (e) => {
    console.log(e.target.checked);
    let newPax = {};
    if (e.target.checked) {
      paxOfFlight.map((p) => {
        newPax[p.id] = null;
      });
    }
    dispatch(mb_selectPax(newPax));
  };
  return (
    <Fragment>
      <Grid marginY={2} container spacing={3} component={'div'} height="stretch">
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ height: { xs: 'stretch', md: 500 }, p: 4, borderRadius: 1 }}>
            Booking Details
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
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
              <FormControl sx={{ m: 3 }} component="fieldset" variant="filled">
                <FormLabel component="legend" style={{ color: 'grey', fontSize: 20, fontWeight: 'bold' }}>
                  Select passenger
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    label={<b>All passengers</b>}
                    control={<Checkbox onChange={handleChangeAll} indeterminate={intermediate} checked={allSelect} color="secondary" />}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    {paxOfFlight.map((b, index) => (
                      <FormControlLabel
                        key={b.id.toString()}
                        control={
                          <Checkbox
                            style={{ color: allSelect ? '#724aba' : 'hotpink' }}
                            checked={selectMBObj?.pax[b.id] !== undefined}
                            name={b.id.toString()}
                            onChange={handleChange}
                          />
                        }
                        label={'Passenger ' + (index + 1) + ': ' + b.firstName + ' ' + b.lastName}
                      />
                    ))}
                  </Box>
                </FormGroup>
              </FormControl>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SelectPax;
