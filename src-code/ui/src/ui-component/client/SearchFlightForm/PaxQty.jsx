/* eslint-disable react/prop-types */
import { Grid, InputAdornment, SvgIcon, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Accessibility, Person } from '@mui/icons-material';

function BaByIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <path d="M134.2,24.2a3.9,3.9,0,0,0-3.6,1.8C120.3,41.6,120,55.9,120,56a7.9,7.9,0,0,0,9.7,7.8c3.7-.7,6.2-4.2,6.3-8a8.1,8.1,0,0,1,8.8-7.8,8.2,8.2,0,0,1,7.2,8.3,24,24,0,0,1-48-.3c0-.6.1-10.8,5.4-24a4,4,0,0,0-4.6-5.4A104.1,104.1,0,0,0,24.1,131.7C26,186.8,71.2,231.1,126.3,232a104,104,0,0,0,7.9-207.8ZM80,128a12,12,0,1,1,12,12A12,12,0,0,1,80,128Zm79,46.7a56.3,56.3,0,0,1-62,0,8.1,8.1,0,0,1-2.2-11.1,8,8,0,0,1,11.1-2.3,39.8,39.8,0,0,0,44.2,0,8,8,0,0,1,11.1,2.3A8.1,8.1,0,0,1,159,174.7Zm5-34.7a12,12,0,1,1,12-12A12,12,0,0,1,164,140Z" />
      </svg>
    </SvgIcon>
  );
}

const PaxQty = ({ maxPax, paxQty, onPaxChange, isQtyValid }) => (
  <Fragment>
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Grid item xs={4}>
        <TextField
          type="number"
          label="Adult"
          name="adl"
          inputProps={{ min: 1, max: maxPax - paxQty.chd, step: 1 }}
          value={paxQty.adl}
          InputProps={{
            style: { textAlign: 'end' },
            endAdornment: (
              <InputAdornment position="start">
                <Person color="secondary" />
              </InputAdornment>
            )
          }}
          onChangeCapture={onPaxChange}
          fullWidth
          sx={{ backgroundColor: 'white', display: { sm: 'block' } }}
          variant="filled"
          color="secondary"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          type="number"
          label="Children"
          name="chd"
          inputProps={{ min: 0, max: maxPax - paxQty.adl, step: 1 }}
          value={paxQty.chd}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Accessibility color="secondary" />
              </InputAdornment>
            )
          }}
          onChangeCapture={onPaxChange}
          fullWidth
          variant="filled"
          color="secondary"
          sx={{ backgroundColor: 'white', display: { sm: 'block' } }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          type="number"
          label="Infant"
          name="inf"
          inputProps={{ min: 0, max: paxQty.adl, step: 1 }}
          value={paxQty.inf}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <BaByIcon color="secondary" />
              </InputAdornment>
            )
          }}
          onChangeCapture={onPaxChange}
          fullWidth
          variant="filled"
          color="secondary"
          sx={{ backgroundColor: 'white', display: { sm: 'block' } }}
        />
      </Grid>
      {!isQtyValid && (
        <Grid item xs={12}>
          <Typography variant="body1" color="#d50000">
            Maximum <b style={{ fontSize: 18 }}>06</b> passengers of adults and children per booking
          </Typography>
          <Typography variant="body2" color="#d50000">
            Maximum <b style={{ fontSize: 18 }}>01</b> infant per accompanying adult
          </Typography>
        </Grid>
      )}
    </Grid>
  </Fragment>
);

export default PaxQty;
