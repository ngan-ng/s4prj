// import { LinearProgress, Typography } from '@mui/material';
import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { isFetchingPnr, selectPnr } from 'store/booking/booking.selector';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';
import { StepperType } from 'ui-component/client/S4prjSteppers/stepper.type';
import SelectFlight from './SelectFlight';
import { Fragment } from 'react';

const ManageBooking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const manageStepper = StepperType.MANAGE_BOOKING;
  // const yourBookings = useSelector(selectPnr);
  // const isFetching = useSelector(isFetchingPnr);

  useEffect(() => {
    // console.log('Effect: ' + yourBookings[0].pnr);
  }, []);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleFinished = () => { };

  return (
    <>
      BOOKING MANAGEMENT
      <S4prjSteppers innerType={manageStepper} activeStep={activeStep} />
      {/* {isFetching && (
        <Typography>
          FETCHING... <LinearProgress />
        </Typography>
      )} */}
      {/* {yourBookings && yourBookings?.map((item) => item.email+ ' ')} */}
      <Container>
        <SelectFlight />

        <Box sx={{ zIndex: '2' }}>
          {activeStep === manageStepper.steppers.length ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleFinished}>Finish</Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>{activeStep === manageStepper.steppers.length - 1 ? 'Finish' : 'Next'}</Button>
              </Box>
            </Fragment>
          )}
        </Box>
      </Container>
    </>
  );
};
export default ManageBooking;
