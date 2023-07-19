/* eslint-disable no-unused-vars */
import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  ButtonGroup,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectFlights, selectFlightsIsFetching } from '../../../store/flight/flight.selector';
import dayjs from 'dayjs';
import { Flight, Search } from '@mui/icons-material';
import '@fontsource/public-sans';
import { selectDepartIdStart, selectReturnIdStart } from '../../../store/flight/flight.action';
import SearchFlightForm from 'ui-component/client/SearchFlightForm';

const SelectFlight = ({ departId, returnId }) => {
  const dispatch = useDispatch();

  const selectFlight = useSelector(selectFlights);
  const isFetching = useSelector(selectFlightsIsFetching);

  const obFlights = selectFlight?.outboundFlights;
  const ibFlights = selectFlight?.inboundFlights;

  var returnDay = [];
  const priceReturnDay = ibFlights !== undefined || ibFlights !== null ? ibFlights[0]?.basePrice : 0;
  if (ibFlights.length != 0) {
    returnDay = ibFlights[0]?.std;
  }
  let departDay;
  let priceDepartDay;
  if (obFlights.length > 0) {
    departDay = obFlights[0]?.std;
    priceDepartDay = obFlights[0]?.basePrice;
  }

  const handleRadioDepart = (event) => {
    dispatch(selectDepartIdStart(event.target.value));
  };

  const handleRadioReturn = (event) => {
    dispatch(selectReturnIdStart(event.target.value));
  };

  const slRef = useRef(null);
  const [slHeight, setSLHeight] = useState(0);
  useLayoutEffect(() => {
    setSLHeight(slRef?.current?.offsetHeight);
  }, [selectFlight]);

  // Search Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <Fragment>
      {isFetching ? (
        <LinearProgress />
      ) : (
        selectFlight?.outboundFlights && (
          <Grid marginY={2} container spacing={3} component={'div'} height="stretch">
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ height: { xs: 'stretch', md: slHeight }, p: 3, borderRadius: 1 }}>
                Booking Details
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper ref={slRef} elevation={4} sx={{ height: 'stretch', p: 3, borderRadius: 1 }}>
                {obFlights.length > 0 && (
                  <>
                    <Grid item xs={12} md={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Flight size="large" sx={{ mr: 1, rotate: '90deg' }} />
                        Departure
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
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
                          <Button>
                            {dayjs(departDay).format('ddd D MMM')}
                            {'  - $'}
                            {priceDepartDay}
                          </Button>
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
                            <Card key={index} variant="outlined" sx={{ mb: 3, p: 2 }}>
                              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid item xs={12} md={9}>
                                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={4} md={4}>
                                      <Typography sx={{ pt: 1 }}>{item.origin.location}</Typography>
                                      <Typography sx={{ pb: 1 }}>({item.origin.iata_code})</Typography>
                                      <Typography sx={{ py: 1 }}>{dayjs(item.std).format('dddd D MMMM YYYY')}</Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={4}
                                      md={4}
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-end'
                                      }}
                                    >
                                      <Typography sx={{ pt: 1 }}>{item.destination.location}</Typography>
                                      <Typography sx={{ pb: 1 }}>({item.destination.iata_code})</Typography>
                                      <Typography sx={{ py: 1 }}>{dayjs(item.std).format('dddd D MMMM YYYY')}</Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={1} md={2}>
                                      <Typography sx={{ py: 1 }}>{dayjs(item.std).format('HH:mm')}</Typography>
                                    </Grid>
                                    <Grid item xs={7} md={8}>
                                      <Divider textAlign="left">
                                        <Flight size="large" sx={{ m: '0', rotate: '90deg' }} />
                                      </Divider>
                                    </Grid>
                                    <Grid item xs={1} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                      <Typography sx={{ py: 1 }}>{dayjs(item.std).add(item.duration, 'minute').format('HH:mm')}</Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                    <Grid item xs={1} md={2}>
                                      <Typography sx={{ py: 1 }} variant="overline">
                                        Direct
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={7} md={8} container direction="row" justifyContent="center" alignItems="center">
                                      <Typography>
                                        {Math.floor(item.duration / 60)}h{item.duration % 60}m
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                      <Typography sx={{ py: 1 }} variant="overline">
                                        FS{item.flightNumber}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Divider orientation="vertical" flexItem></Divider>

                                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <FormControlLabel
                                    key={item.id}
                                    value={item.id}
                                    control={<Radio />}
                                    label={<Typography>${item.basePrice}</Typography>}
                                  />
                                </Grid>
                              </Grid>
                            </Card>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </>
                )}
                {ibFlights.length != 0 ? (
                  <Fragment>
                    <Grid item xs={12} md={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Flight size="large" sx={{ mr: 1, rotate: '-90deg' }} />
                        Return
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
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
                          <Button>
                            {dayjs(returnDay).format('ddd D MMM')}
                            {'  - $'}
                            {priceReturnDay}
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={returnId}
                          onChange={handleRadioReturn}
                        >
                          {ibFlights?.map((item, index) => (
                            <Card key={index} variant="outlined" sx={{ mb: 3, p: 2 }}>
                              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid item xs={12} md={9}>
                                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={4} md={4}>
                                      <Typography sx={{ pt: 1 }}>{item.origin.location}</Typography>
                                      <Typography sx={{ pb: 1 }}>({item.origin.iata_code})</Typography>
                                      <Typography sx={{ py: 1 }}>{dayjs(item.std).format('dddd D MMMM YYYY')}</Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={4}
                                      md={4}
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-end'
                                      }}
                                    >
                                      <Typography sx={{ pt: 1 }}>{item.destination.location}</Typography>
                                      <Typography sx={{ pb: 1 }}>({item.destination.iata_code})</Typography>
                                      <Typography sx={{ py: 1 }}>{dayjs(item.std).format('dddd D MMMM YYYY')}</Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={1} md={2}>
                                      <Typography sx={{ py: 1 }}>{dayjs(item.std).format('HH:mm')}</Typography>
                                    </Grid>
                                    <Grid item xs={7} md={8}>
                                      <Divider textAlign="left">
                                        <Flight size="large" sx={{ m: '0', rotate: '90deg' }} />
                                      </Divider>
                                    </Grid>
                                    <Grid item xs={1} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                      <Typography sx={{ py: 1 }}>{dayjs(item.std).add(item.duration, 'minute').format('HH:mm')}</Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                    <Grid item xs={1} md={2}>
                                      <Typography sx={{ py: 1 }} variant="overline">
                                        Direct
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={7} md={8} container direction="row" justifyContent="center" alignItems="center">
                                      <Typography>
                                        {Math.floor(item.duration / 60)}h{item.duration % 60}m
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                      <Typography sx={{ py: 1 }} variant="overline">
                                        FS{item.flightNumber}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Divider orientation="vertical" flexItem></Divider>

                                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <FormControlLabel
                                    key={item.id}
                                    value={item.id}
                                    control={<Radio />}
                                    label={<Typography>${item.basePrice}</Typography>}
                                  />
                                </Grid>
                              </Grid>
                            </Card>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Fragment>
                ) : (
                  <div></div>
                )}
                <Grid item xs={12}>
                  <Button fullWidth color="secondary" size="large" sx={{ height: 46 }} variant="outlined" onClick={handleDialogOpen}>
                    Search Other Flights <Search />
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
                      <SearchFlightForm />
                    </DialogContent>
                    <DialogActions>
                      <Button color="error" onClick={handleDialogClose}>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )
      )}
    </Fragment>
  );
};
export default SelectFlight;
