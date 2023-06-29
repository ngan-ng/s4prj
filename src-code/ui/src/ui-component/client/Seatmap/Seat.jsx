/* eslint-disable no-unused-vars */
import { EventSeat } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { Fragment } from 'react';

const Seat = ({ s }) => {
  let frontColor = s.seatType === 'HOTSEAT' ? 'secondary' : s.seatType === 'EXIT' ? 'danger' : 'primary';
  let bgColor = s.seatType === 'HOTSEAT' ? 'greenyellow' : s.seatType === 'EXIT' ? 'pink' : 'cyan';
  const disabling = s.status === 'BLOCK' || s.status !== 'AVAILABLE';
  return (
    <Fragment>
      <IconButton disabled={disabling} sx={{}}>
        <EventSeat sx={{ fontSize: { xs: 29, sm: 33, md: 38 }, color: 'grey', backgroundColor: bgColor, borderRadius: '15%', p: 1 }} />
      </IconButton>
    </Fragment>
  );
};

export default Seat;
