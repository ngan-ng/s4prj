/* eslint-disable no-unused-vars */
import { EventSeat, Person } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';

const Seat = ({ s, onClickEvent }) => {
  const seatRef = useRef(null);
  const selectMBObj = useSelector(selectManageBookingObj);
  const [isOnHover, setIsOnHover] = useState(false);
  let frontColor = '#fff';
  let bgColor;
  let disabling = false;
  let iconType = 'seat';
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
      bgColor = '#00bcd4';
      break;
  }
  switch (s.status) {
    case 'NOTAVAILABLE':
    case 'BLOCK':
    case 'OCCUPIED':
      frontColor = 'red';
      iconType = 'person';
      disabling = true;
      break;
    case 'TEMP': {
      let selectedPeriod = (Date.now() - new Date(s.selectedAt)) / (60 * 1000);
      if (selectedPeriod < 10) {
        if (selectMBObj.pax?.includes(parseInt(s.bookingId))) {
          frontColor = 'yellow';
          bgColor = '#1769aa';
          iconType = 'person';
          // seatRef?.current?.scrollIntoView();
          break;
        }
        frontColor = 'red';
        iconType = 'person';
        disabling = true;
      }
      break;
    }
    default:
      disabling = false;
      break;
  }

  let seatIcon = (
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
  );
  if (iconType === 'person') {
    seatIcon = (
      <Person sx={{ fontSize: { xs: 29, sm: 33, md: 38 }, color: frontColor, backgroundColor: bgColor, borderRadius: '15%', p: 1 }} />
    );
  }

  const TitleTooltip = () => {
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
        ref={seatRef}
        onClick={() => onClickEvent(s)}
        onMouseEnter={() => setIsOnHover(true)}
        onMouseLeave={() => setIsOnHover(false)}
        disabled={disabling}
        sx={{ visibility: s.status === null && 'hidden' }}
      >
        <Tooltip title={s.status !== null && <TitleTooltip />} placement="top">
          {seatIcon}
        </Tooltip>
      </IconButton>
    </Fragment>
  );
};

export default Seat;
