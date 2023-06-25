// import { LinearProgress, Typography } from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { isFetchingPnr, selectPnr } from 'store/booking/booking.selector';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';
import { StepperType } from 'ui-component/client/S4prjSteppers/stepper.type';
import SelectFlight from './SelectFlight';
import { Fragment } from 'react';
import SelectPax from './SelectPax';
import SeatAssignment from './SeatAssignment';
import ImportantNotices from './ImportantNotices';
import BoardingPass from './BoardingPass';

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
  const handleFinished = () => {};

  const ManageBookingContent = () => {
    switch (activeStep) {
      case 0:
        return <SelectFlight />;
      case 1:
        return <SelectPax />;
      case 2:
        return <SeatAssignment />;
      case 3:
        return <ImportantNotices />;
      case 4:
        return <BoardingPass />;
      default:
        return <></>;
    }
  };

  return (
    <>
      BOOKING MANAGEMENT
      <S4prjSteppers innerType={manageStepper} activeStep={activeStep} />
      {/* {isFetching && (
        <Typography>
          FETCHING... <LinearProgress />
        </Typography>-
      )} */}
      {/* {yourBookings && yourBookings?.map((item) => item.email+ ' ')} */}
      <Container>
        <Box minHeight={600} sx={{ zIndex: '2', mx: 4 }}>
          {activeStep === manageStepper.steppers.length ? (
            <Fragment>
              <Box>
                <ManageBookingContent />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, m: 5 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleFinished}>Finish</Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Box>
                <ManageBookingContent />
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
    </>
  );
};
export default ManageBooking;
