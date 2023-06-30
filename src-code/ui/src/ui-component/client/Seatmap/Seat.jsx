/* eslint-disable no-unused-vars */
import { EventSeat, Person } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useState } from 'react';

const Seat = ({ s, onClickEvent }) => {
  const [isOnHover, setIsOnHover] = useState(false);
  let frontColor = '#fff';
  let bgColor;
  let disabling;
  switch (s.seatType) {
    case 'HOTSEAT':
      bgColor = '#724aba';
      break;
    case 'EXIT':
      bgColor = '#f06292';
      break;
    case 'STANDARD':
      bgColor = '#00bcd4';
      break;
    default:
      break;
  }
  switch (s.status) {
    case 'NOTAVAILABLE':
    case 'BLOCK':
    case 'SELECTED':
      frontColor = 'red';
      disabling = true;
      break;
    default:
      disabling = false;
      break;
  }

  const SeatTooltip = () => {
    return (
      <span>
        Seat number: <b>{s.seatNumber}</b>
        <Typography fontWeight="bold" fontSize={20}>
          <small>Price: </small>${s.price}
        </Typography>
        <Typography variant="caption" component={'p'} sx={{ p: 1, overflow: 'scroll', height: 100, bgcolor: 'white' }}>
          {s.description}
        </Typography>
      </span>
    );
  };

  return (
    <Fragment>
      <IconButton
        onClick={() => onClickEvent(s)}
        onMouseEnter={() => setIsOnHover(true)}
        onMouseLeave={() => setIsOnHover(false)}
        disabled={disabling}
        sx={{ visibility: s.status === null && 'hidden' }}
      >
        <Tooltip title={s.status !== null && <SeatTooltip />} placement="top">
          {s.status === 'SELECTED' ? (
            <Person sx={{ fontSize: { xs: 29, sm: 33, md: 38 }, color: frontColor, backgroundColor: bgColor, borderRadius: '15%', p: 1 }} />
          ) : (
            <EventSeat
              sx={{
                boxShadow: isOnHover ? 10 : 0,
                fontSize: { xs: 29, sm: 33, md: 38 },
                color: isOnHover ? 'yellow' : frontColor,
                backgroundColor: bgColor,
                borderRadius: '15%',
                p: 1
              }}
            />
          )}
        </Tooltip>
      </IconButton>
    </Fragment>
  );
};

export default Seat;
