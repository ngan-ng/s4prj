import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper } from '@mui/material';
import React, { useRef, useEffect, Fragment, useState, useLayoutEffect } from 'react';
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
    // Code logic display checked boxes
    let numOfSelectedPax = Object.keys(selectMBObj.pax).length;
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

  /// Every change in selecting pax
  /// dispatch to change pax value
  /// of managaBookingObj
  const handleChange = (e) => {
    let pid = parseInt(e.target.name);
    let mbPaxTemp;
    if (e.target.checked) {
      mbPaxTemp = [...selectMBObj.pax, pid];
    } else {
      // delete mbPaxTemp[e.target.name];
      mbPaxTemp = selectMBObj.pax.filter((pId) => pId != pid);
    }
    dispatch(mb_selectPax(mbPaxTemp));
  };
  const handleChangeAll = (e) => {
    let mbPaxTemp = [];
    if (e.target.checked) {
      paxOfFlight.map((p) => {
        mbPaxTemp = [...mbPaxTemp, p.id];
      });
    }
    dispatch(mb_selectPax(mbPaxTemp));
  };

  const ref = useRef(null);
  const [heightRef, setHeightRef] = useState(0);
  useLayoutEffect(() => {
    setHeightRef(ref.current.offsetHeight);
  }, []);
  return (
    <Fragment>
      <Grid marginY={2} container spacing={3} component={'div'} height="stretch">
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ height: { xs: 'stretch', md: heightRef }, p: 4, borderRadius: 1 }}>
            Booking Details
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
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
                            checked={selectMBObj?.pax.includes(b.id)}
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
