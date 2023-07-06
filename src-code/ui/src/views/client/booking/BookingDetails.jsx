import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h3" component="div">
        Booking Details
      </Typography>
    </CardContent>
  </React.Fragment>
);
const BookingDetails = () => {
  return <Card variant="outlined">{card}</Card>;
};

export default BookingDetails;
