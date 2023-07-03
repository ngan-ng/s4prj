import { Box, Button, Container, Grid } from '@mui/material';
import { useEffect, useState, Fragment } from 'react';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';
import { StepperType } from 'ui-component/client/S4prjSteppers/stepper.type';
import SelectFlight from './SelectFlight';
import SelectPax from './SelectPax';
import SeatAssignment from './SeatAssignment';
import ImportantNotices from './ImportantNotices';
import BoardingPass from './BoardingPass';
import { useSelector } from 'react-redux';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';
import { selectSeats } from 'store/seat/seat.selector';

const ManageBooking = () => {
  const manageStepper = StepperType.MANAGE_BOOKING;
  const seats = useSelector(selectSeats);
  const [activeStep, setActiveStep] = useState(0);
  const [validActiveStep, setValidActiveStep] = useState(false);
  const selectMBObj = useSelector(selectManageBookingObj);

  const handleNext = () => {
    if (validActiveStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert('');
    }
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
  useEffect(() => {
    try {
      switch (activeStep) {
        case 0:
          if (selectMBObj.flightId !== 0) {
            setValidActiveStep(true);
          }
          break;
        case 1:
          setValidActiveStep(Object.keys(selectMBObj.pax).length > 0);
          break;
        case 2: {
          const mySeats = seats.filter(
            (s) => selectMBObj.pax.includes(s.bookingId) && (Date.now() - new Date(s.selectedAt)) / (60 * 1000) < 10
          );
          setValidActiveStep(mySeats.length == selectMBObj.pax.length);
          break;
        }
        case 3:
          break;
        case 4:
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }, [activeStep, seats, selectMBObj]);
  return (
    <>
      <S4prjSteppers innerType={manageStepper} activeStep={activeStep} />
      {/* {isFetching && (
        <Typography>
          FETCHING... <LinearProgress />
        </Typography>-
      )} */}
      {/* {yourBookings && yourBookings?.map((item) => item.email+ ' ')} */}
      <Container>
        <Box minHeight={680} sx={{ zIndex: '2', mx: { md: 4, xs: 0 } }}>
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
              <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Grid item xs={12}>
                  <ManageBookingContent />
                </Grid>
                <Grid item>
                  <Button size="large" variant="outlined" color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button disabled={!validActiveStep} size="large" variant="contained" onClick={handleNext} color="secondary">
                    {activeStep === manageStepper.steppers.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Grid>
              </Grid>
            </Fragment>
          )}
        </Box>
      </Container>
    </>
  );
};
export default ManageBooking;
