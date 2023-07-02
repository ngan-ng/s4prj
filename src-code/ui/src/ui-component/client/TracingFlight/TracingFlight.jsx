import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Fragment } from 'react';

const TracingFlight = ({ backgroundOpacity }) => {
  const [flt, setFlt] = useState('');
  const [err, setErr] = useState('');
  const handleChange = (e) => {
    if (e.target.value.length > 6) {
      setErr('Invalid flt');
      e.preventDefault();
    }
    setFlt((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Enter your flight number:</Typography>
          </Grid>
          <Grid item xs={5} sx={{ mx: 2 }}>
            <TextField fullWidth name="flt" value={flt} onChange={handleChange} helperText={err} color="secondary" />
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button fullWidth color="secondary" variant="contained" sx={{ height: 'stretch' }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
export default TracingFlight;
