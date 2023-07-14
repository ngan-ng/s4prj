/* eslint-disable no-unused-vars */
import { Box, Button, Container, Grid } from '@mui/material';
import { useEffect, useState, Fragment, useRef, useLayoutEffect } from 'react';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';
import { StepperType } from 'ui-component/client/S4prjSteppers/stepper.type';
import SelectFlight from './SelectFlight';
import SelectPax from './SelectPax';
import SeatAssignment, { handleSeatApi } from './SeatAssignment';
import ImportantNotices from './ImportantNotices';
import BoardingPass from './BoardingPass';
import { useDispatch, useSelector } from 'react-redux';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';
import { selectSeats } from 'store/seat/seat.selector';
import { ReactComponent as NextBtnFlightIcon } from 'assets/images/icons/animate-flight-depart.svg';
import { checkinStart } from 'store/manage-booking/mb.action';
import LoadingProgress from 'ui-component/client/LoadingProgress';
import { updateSeatSuccess } from 'store/seat/seat.action';

const ManageBooking = () => {
  const dispatch = useDispatch();
  const manageStepper = StepperType.MANAGE_BOOKING;
  const seats = useSelector(selectSeats);
  const [activeStep, setActiveStep] = useState(0);
  const [validActiveStep, setValidActiveStep] = useState(false);
  const selectMBObj = useSelector(selectManageBookingObj);
  const heightBtnRef = useRef(null);
  const [agree, setAgree] = useState(false);
  const handleAgree = (e) => {
    setAgree(e.target.checked);
  };
  const handleNext = () => {
    if (validActiveStep) {
      //////////////////
      // Seat Assignment
      if (activeStep === 2) {
        const mySeats = seats.filter(
          (s) =>
            selectMBObj.pax.includes(parseInt(s.bookingId)) &&
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
      //////////////////
      // Check in
      if (activeStep === 3) {
        const mySeats = seats.filter((s) => selectMBObj.pax.includes(parseInt(s.bookingId)) && s.status === 'OCCUPIED');
        const checkinRequestDtos = { checkinRequestDtos: mySeats.map((item) => ({ bookingId: item.bookingId, seatId: item.id })) };
        console.log(checkinRequestDtos);
        dispatch(checkinStart(checkinRequestDtos));
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

  const ManageBookingContent = () => {
    switch (activeStep) {
      case 0:
        return <SelectFlight />;
      case 1:
        return <SelectPax />;
      case 2:
        return <SeatAssignment />;
      case 3:
        return <ImportantNotices onAgree={handleAgree} isAgree={agree} />;
      case 4:
        return selectMBObj.isManaging ? <LoadingProgress /> : <BoardingPass boardingPasses={selectMBObj?.boardingPasses} />;
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
          const mySeatsLength = seats.filter(
            (s) =>
              selectMBObj.pax.includes(parseInt(s.bookingId)) &&
              (s.status === 'OCCUPIED' || (s.status === 'TEMP' && (Date.now() - new Date(s.selectedAt)) / (60 * 1000) < 10))
          ).length;
          setValidActiveStep(mySeatsLength === selectMBObj.pax.length);
          break;
        }
        case 3:
          setValidActiveStep(agree);
          break;
        case 4:
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }, [activeStep, agree, seats, selectMBObj]);

  const [heightBtn, setHeightBtn] = useState(0);
  useLayoutEffect(() => {
    setHeightBtn(heightBtnRef?.current?.offsetHeight);
  }, []);
  return (
    <>
      <S4prjSteppers innerType={manageStepper} activeStep={activeStep} />
      <Container sx={{ minHeight: '90vh' }}>
        <Box sx={{ zIndex: '2', mx: { md: 4, xs: 0 } }}>
          {activeStep === manageStepper.steppers.length - 1 ? (
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
                <Grid item ref={heightBtnRef}>
                  <Button size="large" variant="outlined" color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                </Grid>
                <Grid item sx={{ display: 'flex', alignItems: 'center', height: heightBtn }}>
                  <Button disabled={!validActiveStep} size="large" variant="contained" onClick={handleNext} color="secondary">
                    {activeStep === manageStepper.steppers.length - 2 ? 'Check In' : 'Next'}
                  </Button>
                  {validActiveStep && <NextBtnFlightIcon fontSize="small" style={{ color: 'white', m: 0, p: 0 }} />}
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
