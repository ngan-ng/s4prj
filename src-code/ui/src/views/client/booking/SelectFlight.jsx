import * as React from 'react';
import { Fragment, useState } from 'react';
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useSelector } from 'react-redux';
import { selectFlights, selectFlightsIsFetching } from '../../../store/flight/flight.selector';
import dayjs from 'dayjs';

// const schema = {
//   radioButton: {
//     presence: {
//       allowEmpty: false,
//       message: '^Blog id is not blank'
//     }
//   }
// };

const SelectFlight = () => {
  const initialOutboundFlight = {
    id: '',
    aircraft: '',
    basePrice: '',
    destination: {},
    duration: '',
    etd: '',
    flightNumber: '',
    flightStatus: '',
    gate: '',
    origin: {},
    std: ''
  };

  const initialInboundFlight = {
    id: '',
    aircraft: '',
    basePrice: '',
    destination: {},
    duration: '',
    etd: '',
    flightNumber: '',
    flightStatus: '',
    gate: '',
    origin: {},
    std: ''
  };

  const initialIsSelect = {
    isSelectOutbound: false,
    isSelectInbound: false
  };

  const [isSelect, setIsSelect] = useState(initialIsSelect);

  // const [validation, setValidation] = useState({
  //   touched: {},
  //   errors: {},
  //   isValid: false
  // });

  // useEffect(() => {
  //   const valid = setTimeout(() => {
  //     const errors = validate([initialOutboundFlight, initialInboundFlight], schema);
  //     console.log(errors);
  //
  //     setValidation((prev) => ({
  //       ...prev,
  //       errors: errors || {},
  //       isValid: errors ? false : true
  //     }));
  //   }, 1000);
  //
  //   return () => {
  //     clearTimeout(valid);
  //   };
  // }, [initialOutboundFlight, initialInboundFlight]);

  // const hasError = (field) => {
  //   return validation.touched[field] && validation.errors[field] ? true : false;
  // };

  const [outboundFlight, setOutboundFlight] = useState(initialOutboundFlight);
  const [inboundFlight, setInboundFlight] = useState(initialInboundFlight);

  const selectFlight = useSelector(selectFlights);
  const isFetching = useSelector(selectFlightsIsFetching);
  console.log('selector flights: ', selectFlight);
  const outbound = selectFlight.outboundFlights;
  const inbound = selectFlight.inboundFlights;
  //console.log(inbound);

  // const inbound = selectFlight[Object.keys(selectFlight)[0]];
  // const outbound = selectFlight[Object.keys(selectFlight)[1]];
  // console.log('inbound: ', inbound);
  // console.log('outbound: ', outbound);

  const handleOutboundFlight = (e) => {
    const id = parseInt(e.target.value);
    var ob = outbound.filter((s) => s.id === id);
    // const date = new Date(ob[0].std);
    // const formatDate = date.toDateString();

    setOutboundFlight((prev) => ({
      ...prev,
      id: ob[0].id,
      aircraft: ob[0].aircraft,
      basePrice: ob[0].basePrice,
      destination: ob[0].destination,
      duration: ob[0].duration,
      etd: ob[0].etd,
      flightNumber: ob[0].flightNumber,
      flightStatus: ob[0].flightStatus,
      gate: ob[0].gate,
      origin: ob[0].origin,
      std: ob[0].std
    }));

    setIsSelect((prev) => ({
      ...prev,
      isSelectOutbound: true
    }));
  };

  const handleInboundFlight = (e) => {
    console.log(e.target.value);
    const id = parseInt(e.target.value);
    var ib = inbound.filter((s) => s.id === id);
    const date = new Date(ib[0].std);
    const formatDate = date.toDateString();
    console.log(formatDate);

    setInboundFlight((prev) => ({
      ...prev,
      id: ib[0].id,
      aircraft: ib[0].aircraft,
      basePrice: ib[0].basePrice,
      destination: ib[0].destination,
      duration: ib[0].duration,
      etd: ib[0].etd,
      flightNumber: ib[0].flightNumber,
      flightStatus: ib[0].flightStatus,
      gate: ib[0].gate,
      origin: ib[0].origin,
      std: ib[0].std
    }));

    setIsSelect((prev) => ({
      ...prev,
      isSelectInbound: true
    }));
  };

  function getDate(std) {
    const date = new Date(std);
    return date.toDateString();
  }

  function getTime(std) {
    const date = new Date(std);
    const [hour, minutes] = [date.getHours(), date.getMinutes()];
    const getLength = minutes.toString().length;
    //console.log('getLength', getLength);
    const time = getLength === 1 ? `${hour}:${minutes}0` : `${hour}:${minutes}`;
    return time;
  }

  function arrivalTime(std, duration) {
    const departure = dayjs(std);
    const arrivalTime = departure.add(duration, 'minute').format('HH:mm');
    //console.log('arrivalTime', arrivalTime);
    return arrivalTime;
  }

  // const [value, setValue] = React.useState();
  //
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const [selectedValue, setSelectedValue] = React.useState('a');
  //
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  function getBasePrice(basePrice) {
    return '$' + basePrice;
  }

  var tempIdOB;
  var tempIdIB;

  function getFlightIdOutbound(id) {
    console.log('getFlightIdOutbound', id);
    tempIdOB = id;
  }

  function getFlightIdInbound(id) {
    console.log('getFlightIdInbound', id);
    tempIdIB = id;
  }

  function compareOBIdAndRadio() {
    const idOutbound = outboundFlight.id;

    if (tempIdOB === idOutbound) {
      return idOutbound;
    }
    //console.log('getFlightIdOutbound', idOutbound);
    //console.log('getId', tempIdOB);
  }

  function compareIBIdAndRadio() {
    const idInbound = inboundFlight.id;

    if (tempIdIB === idInbound) {
      return idInbound;
    }
    //console.log('getFlightIdOutbound', idInbound);
    //console.log('getId', tempIdIB);
  }

  return (
    <Fragment>
      {isFetching ? (
        <LinearProgress />
      ) : (
        <Grid marginY={2} container spacing={3} component={'div'} height={550}>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ height: { xs: 'stretch', md: 550 }, p: 3, borderRadius: 1 }}>
              Booking Details
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={4} sx={{ height: { xs: 'stretch', md: 550 }, p: 3, borderRadius: 1 }}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                Outbound flights
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& > *': {
                    m: 1
                  }
                }}
              >
                <ButtonGroup size="large" aria-label="large button group">
                  {selectFlight.outboundFlights.map((item) => (
                    <Button key={item.id} onClick={handleOutboundFlight} value={item.id}>
                      {getDate(item.std)}
                      {' - $'}
                      {item.basePrice}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>

              {/*<Box sx={{ width: '100%' }}>*/}
              {/*  {selectFlight.outboundFlights.map((item) => (*/}
              {/*    <Tabs key={item.id} value={value} onChange={handleChange} aria-label="wrapped label tabs example">*/}
              {/*      <Tab value={item.id} wrapped onClick={handleOutboundFlight}>*/}
              {/*        {getDate(item.std)}*/}
              {/*        {' - $'}*/}
              {/*        {item.basePrice}*/}
              {/*      </Tab>*/}
              {/*    </Tabs>*/}
              {/*  ))}*/}
              {/*</Box>*/}

              <Box sx={{ minWidth: 275 }}>
                {isSelect.isSelectOutbound ? (
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Typography>{outboundFlight.origin.location}</Typography>
                          <Typography>{outboundFlight.origin.iata_code}</Typography>
                          <Typography>{getDate(outboundFlight.std)}</Typography>
                          <Typography>{getTime(outboundFlight.std)}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>{outboundFlight.destination.location}</Typography>
                          <Typography>{outboundFlight.destination.iata_code}</Typography>
                          <Typography>{getDate(outboundFlight.std)}</Typography>
                          <Typography>{arrivalTime(outboundFlight.std, outboundFlight.duration)}</Typography>
                        </Grid>
                        <Grid item>
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              defaultValue={compareOBIdAndRadio}
                            >
                              <FormControlLabel
                                value={outboundFlight.id}
                                control={<Radio />}
                                label={getBasePrice(outboundFlight.basePrice)}
                                onChange={getFlightIdOutbound(outboundFlight.id)}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" alignItems="center" justifyContent="center">
                        <Typography>{outboundFlight.duration}</Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                ) : (
                  <Typography>Please select outbound flight</Typography>
                )}
              </Box>

              <Typography variant="h3" sx={{ mb: 1 }}>
                Inbound flights
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& > *': {
                    m: 1
                  }
                }}
              >
                <ButtonGroup size="large" aria-label="large button group">
                  {selectFlight.inboundFlights.map((item) => (
                    <Button key={item.id} onClick={handleInboundFlight} value={item.id}>
                      {getDate(item.std)}
                      {' - $'}
                      {item.basePrice}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>

              <Box sx={{ minWidth: 275 }}>
                {isSelect.isSelectInbound ? (
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Typography>{inboundFlight.origin.location}</Typography>
                          <Typography>{inboundFlight.origin.iata_code}</Typography>
                          <Typography>{getDate(inboundFlight.std)}</Typography>
                          <Typography>{getTime(inboundFlight.std)}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>{inboundFlight.destination.location}</Typography>
                          <Typography>{inboundFlight.destination.iata_code}</Typography>
                          <Typography>{getDate(inboundFlight.std)}</Typography>
                          <Typography>{arrivalTime(inboundFlight.std, inboundFlight.duration)}</Typography>
                        </Grid>

                        <Grid item>
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              defaultValue={compareIBIdAndRadio()}
                            >
                              <FormControlLabel
                                value={inboundFlight.id}
                                control={<Radio />}
                                label={getBasePrice(inboundFlight.basePrice)}
                                onChange={getFlightIdInbound(inboundFlight.id)}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" alignItems="center" justifyContent="center">
                        <Typography>{inboundFlight.duration}</Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                ) : (
                  <Typography>Please select inbound flight</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};
export default SelectFlight;
