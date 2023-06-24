import React, { Fragment, useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Box, Button, StepIcon, Typography, LinearProgress } from '@mui/material';
import StepperType from './stepper.type';
import { useSelector } from 'react-redux';
import { selectFlights, selectFlightsIsFetching } from '../../../store/flight/flight.selector';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(147,133,216) 10%,rgb(172,160,224) 50%,rgb(138,35,135) 90%)',
      // vertical padding + font size from searchIcon
      paddingLeft: (1, 1, 1, 1),
      transition: theme.transitions.create('backgroundImage'),
      marginLeft: '10px',
      marginRight: '10px'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(147,133,216) 10%,rgb(172,160,224)  50%,rgb(138,35,135) 90%)',
      // vertical padding + font size from searchIcon
      paddingLeft: (1, 1, 1, 1),
      transition: theme.transitions.create('backgroundImage'),
      marginLeft: '10px',
      marginRight: '10px'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : '#eaeaf0',
    borderRadius: 5,
    paddingLeft: (1, 1, 1, 1),
    transition: theme.transitions.create('backgroundImage'),
    backgroundImage: 'linear-gradient( 95deg,rgb(147,133,216)',
    marginLeft: '10px',
    marginRight: '10px'
  }
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccd',
  zIndex: 1,
  color: '#fff',
  width: 35,
  height: 35,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(205,112,218) 10%, rgb(114,74,186) 68%, rgb(96,47,146) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(205,112,218) 10%, rgb(114,74,186) 68%, rgb(96,47,146) 100%)'
  })
}));

function BookingSteppers(props) {
  const { active, completed, className } = props;

  const icons = StepperType.BOOKING.icons;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function ManageBookingStepIcon(props) {
  const { active, completed, className } = props;

  const icons = StepperType.MANAGE_BOOKING.icons;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const S4prjSteppers = ({ activeStep, handleNext, handleBack, stepperName, onFinished }) => {
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

  let steps = [];
  let stepIconComponents = StepIcon;
  switch (stepperName) {
    case StepperType.BOOKING.name:
      steps = StepperType.BOOKING.steppers;
      stepIconComponents = BookingSteppers;
      break;
    case StepperType.MANAGE_BOOKING.name:
      steps = StepperType.MANAGE_BOOKING.steppers;
      stepIconComponents = ManageBookingStepIcon;
      break;
  }

  const handleFlight = (e) => {
    console.log(e.target.value);
    const id = parseInt(e.target.value);
    var ib = inbound.filter((s) => s.id === id);
    console.log(ibflight[0].std);
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
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={stepIconComponents}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={onFinished}>Finish</Button>
          </Box>
        </Fragment>
      ) : (
        <>
          {isFetching ? (
            <LinearProgress />
          ) : (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>

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

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
              </Box>
            </Fragment>
          )}
        </>
      )}
    </Stack>
  );
};

export default S4prjSteppers;
