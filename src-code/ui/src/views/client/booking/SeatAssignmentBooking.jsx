/* eslint-disable no-unused-vars */
import { Button, Grid } from '@mui/material';
import { memo, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDepartId, selectReturnId } from 'store/flight/flight.selector';
import { mb_selectFlight, mb_selectPax } from 'store/manage-booking/mb.action';
import { isFetchingSeats, selectSeats } from 'store/seat/seat.selector';
import SeatAssignment from '../manage-booking/SeatAssignment';
import { selectBookings } from 'store/booking/booking.selector';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';

const SeatAssignmentBooking = () => {
  const dispatch = useDispatch();

  const departId = useSelector(selectDepartId);
  const returnId = useSelector(selectReturnId);
  const isSeatsFetching = useSelector(isFetchingSeats);
  const seats = useSelector(selectSeats);
  const bookings = useSelector(selectBookings);
  const selectMBObj = useSelector(selectManageBookingObj);

  const handleSelectSeatForFlight = (flightType) => {
    // ManageBooking
    // select flight -> select pax -> select Seat
    // select flight
    const selectingFlight = flightType === 'depart' ? departId : returnId;
    const paxOfFlight = bookings?.filter((b) => b.flight.id == selectingFlight).map((b) => b.id);
    console.log(`Pax In Flight:: `, paxOfFlight);
    dispatch(mb_selectFlight(selectingFlight));
    const timeout = setTimeout(() => {
      dispatch(mb_selectPax(paxOfFlight));
    }, 100);
    return () => clearTimeout(timeout);
  };

  function Panel({ title, children, isActive }) {
    return (
      <section className="panel">
        <h3>{title}</h3>
        {isActive && <>{children}</>}
      </section>
    );
  }
  return (
    <Fragment>
      <Grid marginY={2} container spacing={3} component={'div'} height="stretch">
        <Grid item xs={12}>
          <Button onClick={() => handleSelectSeatForFlight('depart')}>Select Seat For Departure</Button>
          <Button onClick={() => handleSelectSeatForFlight('return')}>Select Seat For Return</Button>
        </Grid>
        {!isSeatsFetching && (
          <>
            <Panel title="Departure" isActive={selectMBObj.flightId === departId}>
              {seats && <SeatAssignment />}
            </Panel>
            <Panel title="Return" isActive={selectMBObj.flightId === returnId}>
              {seats && <SeatAssignment />}
            </Panel>
          </>
        )}
      </Grid>
    </Fragment>
  );
};

export default memo(SeatAssignmentBooking);
