import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchBookingByPnrStart } from 'store/booking/booking.action';
import { mb_clear } from 'store/manage-booking/mb.action';

const SearchBookingForm = ({ backgroundOpacity }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pnr, setPnr] = useState('');
  const [err, setErr] = useState('');
  const handleChange = (e) => {
    if (e.target.value.length > 6) {
      setErr('PNR is valid that contains 6 alphabetic letters and number');
      e.preventDefault();
    } else {
      setPnr(e.target.value);
      setErr('');
    }
  };
  const handleManageBooking = (e) => {
    try {
      dispatch(mb_clear());
      dispatch(fetchBookingByPnrStart(pnr));
      navigate('/manage-booking', { state: { searchingPnr: pnr } });
    } catch (error) {
      console.log(error);
      e.preventDefault();
    }
  };

  return (
    <Fragment>
      <Paper
        variant="string"
        sx={{
          p: 3,
          m: '0 auto',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          backgroundColor: `${backgroundOpacity}`
        }}
      >
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Grid item xs={8} md={8}>
            <TextField
              variant="filled"
              fullWidth
              name="pnr"
              label="Your Booking PNR"
              value={pnr}
              onChange={handleChange}
              color="secondary"
              sx={{ backgroundColor: 'whitesmoke' }}
            />
          </Grid>
          <Grid item xs={3} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button onClick={handleManageBooking} fullWidth color="secondary" variant="contained" sx={{ height: 'stretch' }}>
              Search
            </Button>
          </Grid>
        </Grid>
        <Typography xs={12} sx={{ pt: 1, mx: 2 }} variant="body1" color="#d50000">
          {err}
        </Typography>
      </Paper>
    </Fragment>
  );
};
export default SearchBookingForm;
