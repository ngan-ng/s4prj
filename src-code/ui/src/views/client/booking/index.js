/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';
import { StepperType } from '../../../ui-component/client/S4prjSteppers/stepper.type';
import { Box, Button, Container } from '@mui/material';
import SelectFlight from './SelectFlight';
import Passengers from './Passengers';
import Payment from './Payment';
import SeatAssignment from './SeatAssignment';
import Itinerary from './Itinerary';
import { useDispatch, useSelector } from 'react-redux';
import { selectReturnId, selectDepartId } from '../../../store/flight/flight.selector';
import { createPassengerStart } from 'store/passenger/passenger.action';
import { useCallback } from 'react';
import { b_clear, createBookingStart } from 'store/booking/booking.action';
import { selectPassengers } from 'store/passenger/passenger.selector';

const Booking = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [validActiveStep, setValidActiveStep] = useState(false);
  const manageStepper = StepperType.BOOKING;
  const departId = useSelector(selectDepartId);
  const returnId = useSelector(selectReturnId);
  const [isFormValid, setIsFormValid] = useState(false);
  //const passengers = useSelector(selectPassengers);
  const handleCreatePaxStart = useCallback(
    (payload) => {
      dispatch(createPassengerStart(payload));
    },
    [dispatch]
  );
  const handleFormValid = (val) => {
    console.log(val);
    setIsFormValid(val);
  };

  const handleNext = () => {
    if (validActiveStep) {
      if (activeStep === 1) {
        //const reqDto = {bookings: []}
        // handleCreatePaxStart();
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert('');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinished = () => {};

  const BookingContent = () => {
    switch (activeStep) {
      case 0:
        return <SelectFlight departId={departId} returnId={returnId} />;
      case 1:
        return <Passengers onHandleFullfill={handleCreatePaxStart} onFormValid={handleFormValid} />;
      case 2:
        return <SeatAssignment />;
      case 3:
        return <Payment />;
      case 4:
        return <Itinerary />;
      default:
        return <Fragment></Fragment>;
    }
  };

  useEffect(() => {
    try {
      switch (activeStep) {
        case 0:
          setValidActiveStep((departId !== null && returnId !== null) || returnId !== null || departId !== null);
          break;
        case 1:
          setValidActiveStep(isFormValid);
          break;
        case 2:
          break;
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
  }, [activeStep, departId, isFormValid, returnId]);

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
                <Button
                  disabled={!validActiveStep}
                  size="large"
                  variant="contained"
                  onClick={handleNext}
                  color="secondary"
                  sx={{ opacity: 0.9 }}
                >
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
