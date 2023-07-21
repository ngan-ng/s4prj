/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';
import { StepperType } from '../../../ui-component/client/S4prjSteppers/stepper.type';
import { Box, Button, Container } from '@mui/material';
import SelectFlight from './SelectFlight';
import Passengers from './Passengers';
import Payment from './Payment';
import SeatAssignmentBooking from './SeatAssignmentBooking';
import Itinerary from './Itinerary';
import { useDispatch, useSelector } from 'react-redux';
import { selectReturnId, selectDepartId } from '../../../store/flight/flight.selector';
import { createPassengerStart } from 'store/passenger/passenger.action';
import { createBookingStart } from 'store/booking/booking.action';
import { selectPassengers } from 'store/passenger/passenger.selector';
import { useLocation, useNavigate } from 'react-router';
import { sendEmailStart } from 'store/itinerary/itinerary.action';
import { selectCompletedPaypal } from 'store/itinerary/itinerary.selector';
import { isFetchingSeats, selectSeats } from 'store/seat/seat.selector';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';
import { updateSeatSuccess } from 'store/seat/seat.action';
import { handleSeatApi } from '../manage-booking/SeatAssignment';

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [validActiveStep, setValidActiveStep] = useState(false);
  const manageStepper = StepperType.BOOKING;
  const departId = useSelector(selectDepartId);
  const returnId = useSelector(selectReturnId);
  const [isFormValid, setIsFormValid] = useState(false);
  const passengers = useSelector(selectPassengers);

  const completedPaypal = useSelector(selectCompletedPaypal);

  const location = useLocation();
  const [activeStepFromPayment] = useState(location.state?.activeStep);
  console.log('activeStepFromPayment', activeStepFromPayment);

  useEffect(() => {
    if (activeStepFromPayment == 4) setActiveStep((prevActiveStep) => prevActiveStep + 4);
  }, [activeStepFromPayment]);

  const handleCreatePaxStart = (payload) => {
    if (passengers == null) {
      dispatch(createPassengerStart(payload));
    }
  };
  //console.log(passengers);
  const handleFormValid = (val) => {
    console.log(val);
    setIsFormValid(val);
  };

  ////
  // Seat Assignment States
  const seats = useSelector(selectSeats);
  const selectMBObj = useSelector(selectManageBookingObj);
  const isSeatsFetching = useSelector(isFetchingSeats);
  // End Seat Assignment States

  const handleNext = () => {
    if (validActiveStep) {
      if (activeStep === 1) {
        dispatch(createBookingStart(passengers));
      }

      //// Seat Assignment
      // AFTER PAYPAL SUCCESS => SET SEAT STATUS 'OCCUPIED'
      if (activeStep >= 4) {
        const mySeats = seats.filter(
          (s) =>
            selectMBObj?.pax.includes(parseInt(s.bookingId)) &&
            s.status === 'TEMP' &&
            (Date.now() - new Date(s.selectedAt)) / (60 * 1000) < 10
        );
        if (mySeats.length > 0) {
          let selectSeatDto = {
            id: 0,
            bookingId: 0,
            action: 'complete'
          };
          try {
            let isSuccess = mySeats.map((mySeat) => {
              handleSeatApi({ ...selectSeatDto, id: mySeat.id, bookingId: mySeat.bookingId }).then((resp) => {
                return resp.status === 200 || resp.status === 201;
              });
            });
            if (isSuccess) {
              mySeats.map((item) => {
                let index = seats.findIndex((s) => s.id == item.id);
                seats[index] = { ...seats[index], status: 'OCCUPIED' };
              });
              dispatch(updateSeatSuccess(seats));
            }
          } catch (error) {
            alert('Seats assignment not completed, please try again!');
            return;
          }
        }
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert('');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinished = () => {
    dispatch(sendEmailStart(completedPaypal));
  };

  const BookingContent = () => {
    switch (activeStep) {
      case 0:
        return <SelectFlight departId={departId} returnId={returnId} />;
      case 1:
        return <Passengers onHandleFulfill={handleCreatePaxStart} onFormValid={handleFormValid} />;
      case 2:
        return !isSeatsFetching && <SeatAssignmentBooking />;
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
