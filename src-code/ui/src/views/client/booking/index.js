import { Fragment, useState } from 'react';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';
import { StepperType } from '../../../ui-component/client/S4prjSteppers/stepper.type';
import { Box, Button, Container } from '@mui/material';
import SelectFlight from './SelectFlight';
import Passengers from './Passengers';
import Payment from './Payment';
import SeatAssignment from './SeatAssignment';
import Itinerary from './Itinerary';

const Booking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const manageStepper = StepperType.BOOKING;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinished = () => {};

  const BookingContent = () => {
    switch (activeStep) {
      case 0:
        return <SelectFlight />;
      case 1:
        return <Passengers />;
      case 2:
        return <SeatAssignment />;
      case 3:
        return <Payment />;
      case 4:
        return <Itinerary />;
      default:
        return <></>;
    }
  };

  return (
    <Fragment>
      <div>Booking</div>
      <S4prjSteppers innerType={manageStepper} activeStep={activeStep} />
      <Container>
        <Box minHeight={600} sx={{ zIndex: '2', mx: 4 }}>
          {activeStep === manageStepper.steppers.length ? (
            <Fragment>
              <Box>
                <BookingContent />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, m: 5 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleFinished}>Finish</Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Box>
                <BookingContent />
              </Box>
              <Box position="relative" sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginY: 10, marginX: 15 }}>
                <Button size="large" variant="outlined" color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button size="large" variant="contained" onClick={handleNext} color="secondary" sx={{ opacity: 0.9 }}>
                  {activeStep === manageStepper.steppers.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Fragment>
          )}
        </Box>
      </Container>
    </Fragment>
  );
};
export default Booking;
