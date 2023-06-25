import * as React from 'react';
import { Fragment, useState } from 'react';
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector } from 'react-redux';
import { selectFlights, selectFlightsIsFetching } from '../../../store/flight/flight.selector';

const SelectFlight = () => {
  const initialFlight = {
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

  const [flight, setFlight] = useState(initialFlight);

  const selectFlight = useSelector(selectFlights);
  const isFetching = useSelector(selectFlightsIsFetching);
  console.log('selector flights: ', selectFlight);
  const inbound = selectFlight.inboundFlights;
  //console.log(inbound);

  // const inbound = selectFlight[Object.keys(selectFlight)[0]];
  // const outbound = selectFlight[Object.keys(selectFlight)[1]];
  // console.log('inbound: ', inbound);
  // console.log('outbound: ', outbound);

  const handleFlight = (e) => {
    console.log(e.target.value);
    const id = parseInt(e.target.value);
    var ib = inbound.filter((s) => s.id === id);
    console.log(ib[0].std);
    console.log(inbound.filter((s) => s.id === id));

    setFlight((prev) => ({
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
  };

  return (
    <Fragment>
      {isFetching ? (
        <LinearProgress />
      ) : (
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
                    <Button key={item.id} onClick={handleFlight} value={item.id}>
                      {item.std} {item.basePrice}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
              <Typography>{flight.id}</Typography>

              <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography>{flight.origin.location}</Typography>
                    <Typography>{flight.origin.iata_code}</Typography>

                    <Typography>{flight.destination.location}</Typography>
                    <Typography>{flight.destination.iata_code}</Typography>

                    <Typography>{flight.std}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};
export default SelectFlight;
