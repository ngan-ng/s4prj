/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { Box, Button, Divider, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector, useDispatch } from 'react-redux';
import { selectFlights, selectFlightsIsFetching } from '../../../store/flight/flight.selector';
//import dayjs from 'dayjs';
import { Flight } from '@mui/icons-material';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID
} from '@mui/material/styles';
import '@fontsource/public-sans';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { selectDepartIdStart, selectReturnIdStart } from '../../../store/flight/flight.action';

const materialTheme = materialExtendTheme();

const SelectFlight = ({ departId, returnId }) => {
  const dispatch = useDispatch();

  const selectFlight = useSelector(selectFlights);
  const isFetching = useSelector(selectFlightsIsFetching);
  console.log('selector flights: ', selectFlight);
  const obFlights = selectFlight.outboundFlights;
  const ibFlights = selectFlight.inboundFlights;

  var arrivalDay = [];
  if (ibFlights.length != 0) {
    arrivalDay = ibFlights[0].std;
  }

  const departDay = obFlights[0].std;

  const handleRadioDepart = (event) => {
    dispatch(selectDepartIdStart(event.target.value));
  };

  const handleRadioArrival = (event) => {
    dispatch(selectReturnIdStart(event.target.value));
  };

  // function getDate(std) {
  //   const date = new Date(std);
  //   return date.toDateString();
  // }

  // function getTime(std) {
  //   const date = new Date(std);
  //   const [hour, minutes] = [date.getHours(), date.getMinutes()];
  //   const getLength = minutes.toString().length;
  //   //console.log('getLength', getLength);
  //   return getLength === 1 ? `${hour}:${minutes}0` : `${hour}:${minutes}`;
  // }

  // function arrivalTime(std, duration) {
  //   const departure = dayjs(std);
  //   //console.log('arrivalTime', arrivalTime);
  //   return departure.add(duration, 'minute').format('HH:mm');
  // }

  const slRef = useRef(null);
  const [slHeight, setSLHeight] = useState(0);
  useLayoutEffect(() => {
    setSLHeight(slRef?.current.offsetHeight);
  }, []);
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <Fragment>
          {/*{isFetching ? (*/}
          {/*  <LinearProgress />*/}
          {/*) : (*/}
          <Grid marginY={2} container spacing={3} component={'div'} height="stretch">
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ height: { xs: 'stretch', md: slHeight }, p: 3, borderRadius: 1 }}>
                Booking Details
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper ref={slRef} elevation={4} sx={{ height: 'stretch', p: 3, borderRadius: 1 }}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Flight size="large" sx={{ mr: 1, rotate: '90deg' }} />
                    Departure
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '& > *': {
                        m: 3
                      }
                    }}
                  >
                    <ButtonGroup size="large" aria-label="large button group">
                      <Button>{departDay}</Button>
                    </ButtonGroup>
                  </Box>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={departId}
                      onChange={handleRadioDepart}
                    >
                      {obFlights.map((item, index) => (
                        <Card key={item.id} variant="outlined" sx={{ mb: 3 }}>
                          <CardContent>
                            <Grid container xs={12} md={12} direction="row" justifyContent="space-between" alignItems="center">
                              <Grid item md={4}>
                                <Typography>{item.origin.location}</Typography>
                                <Typography>{item.origin.iata_code}</Typography>
                                <Typography>{item.std}</Typography>
                                <Typography>{item.std}</Typography>
                              </Grid>
                              <Grid item md={4}>
                                <Typography>{item.destination.location}</Typography>
                                <Typography>{item.destination.iata_code}</Typography>
                                <Typography>{item.std}</Typography>
                                <Typography>{item.duration}</Typography>
                              </Grid>
                              <Grid item md={2}>
                                <FormControlLabel
                                  key={item.id}
                                  value={item.id}
                                  control={<Radio />}
                                  label={<Typography>${item.basePrice}</Typography>}
                                />
                              </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems="center" justifyContent="center">
                              <Typography>{item.duration}</Typography>
                            </Grid>
                          </CardContent>
                        </Card>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {ibFlights.length != 0 ? (
                  <Fragment>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Flight size="large" sx={{ mr: 1, rotate: '-90deg' }} />
                        Return
                      </Box>
                    </Grid>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                          m: 3
                        }
                      }}
                    >
                      <ButtonGroup size="large">
                        <Button>{arrivalDay}</Button>
                      </ButtonGroup>
                    </Box>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={returnId}
                          onChange={handleRadioArrival}
                        >
                          {ibFlights.map((item, index) => (
                            <Card key={item.id} variant="outlined" sx={{ mb: 3 }}>
                              <CardContent>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                  <Grid item>
                                    <Typography>{item.origin.location}</Typography>
                                    <Typography>{item.origin.iata_code}</Typography>
                                    <Typography>{item.std}</Typography>
                                    <Typography>{item.std}</Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography>{item.destination.location}</Typography>
                                    <Typography>{item.destination.iata_code}</Typography>
                                    <Typography>{item.std}</Typography>
                                    <Typography>{item.duration}</Typography>
                                  </Grid>
                                  <Grid item>
                                    <FormControlLabel
                                      key={item.id}
                                      value={item.id}
                                      control={<Radio />}
                                      label={<Typography>${item.basePrice}</Typography>}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" justifyContent="center">
                                  <Typography>{item.duration}</Typography>
                                </Grid>
                              </CardContent>
                            </Card>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Fragment>
                ) : (
                  <div></div>
                )}
              </Paper>
            </Grid>
          </Grid>
          {/*)}*/}
        </Fragment>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};
export default SelectFlight;
