import { Box, Divider, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';

const SingleReview = ({ props }) => {
  const { booking, payments } = props;
  function getSubtotal(total, p) {
    return total + p.price;
  }
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">
              <strong>Flight: </strong> VJ
              {booking.flight.flightNumber}
            </Typography>
            <Typography variant="body1">
              {booking.flight.origin.iata_code} - {booking.flight.destination.iata_code}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Passenger</Typography>
            <Typography variant="body1">
              {booking.firstName} {booking.lastName}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ m: 0.5 }}>
        <Grid container>
          <Grid item xs>
            {payments.map((p, index) => (
              <div key={index} style={{ width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    borderRadius: 1
                  }}
                >
                  <Typography color="text.primary" variant="body2">
                    {p.category}
                  </Typography>
                  <Typography color="text.primary" variant="body3">
                    ${p.price} USD
                  </Typography>
                </Box>
              </div>
            ))}
          </Grid>
        </Grid>
      </Box>
      <Divider variant="inset" light />
      <Box
        sx={{
          m: 0.5,
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          borderRadius: 1
        }}
      >
        <Typography>Subtotal: </Typography>
        <Typography>${payments.reduce(getSubtotal, 0)} USD</Typography>
      </Box>
      <Divider sx={{ m: 1 }} variant="fullWidth" />
      {booking.s}
    </Fragment>
  );
};
export default SingleReview;
