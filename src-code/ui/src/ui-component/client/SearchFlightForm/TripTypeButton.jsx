import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const TripTypeButton = ({ isOneway, onTypeChange }) => {
  return (
    <>
      <RadioGroup
        row
        sx={{ display: 'flex', justifyContent: 'center' }}
        aria-labelledby="ticket-type-label"
        name="tripType"
        defaultValue="roundtrip"
        onChange={onTypeChange}
        spacing={1}
      >
        <FormControlLabel
          value="roundtrip"
          control={<Radio size="small" color="secondary" />}
          label={<Typography color={isOneway ? '' : 'secondary'}>Roundtrip</Typography>}
          labelPlacement="top"
          color="secondary"
        />
        <FormControlLabel
          value="oneway"
          control={<Radio size="small" color="secondary" />}
          label={<Typography color={isOneway ? 'secondary' : ''}>Oneway</Typography>}
          labelPlacement="top"
        />
      </RadioGroup>
    </>
  );
};
export default TripTypeButton;
