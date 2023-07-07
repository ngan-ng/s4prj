import { Grid, TextField, Typography } from '@mui/material';

const TotalPax = ({ total }) => {
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
      <TextField
        variant="filled"
        label={
          <Typography color="white" fontSize={18} fontWeight="bold">
            Total
          </Typography>
        }
        aria-readonly
        value={`${total < 10 ? '0' + total : total} Passengers`}
        inputProps={{
          style: {
            textAlign: 'end',
            color: 'white',
            backgroundColor: 'indigo',
            opacity: 0.8,
            borderRadius: 5
          }
        }}
        sx={{ width: { xs: '100%', md: '90%' } }}
      />
    </Grid>
  );
};
export default TotalPax;
