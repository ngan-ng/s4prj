import { Search } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';

const SubmitButton = ({ validation, onSubmit }) => {
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
      <Button
        color="secondary"
        sx={{
          py: 1.5,
          alignContent: 'stretch',
          width: { xs: '100%', sm: '90%' }
        }}
        variant="contained"
        size="large"
        onClick={onSubmit}
        endIcon={<Search />}
        disabled={!validation.isValid}
      >
        Search
      </Button>
    </Grid>
  );
};
export default SubmitButton;
