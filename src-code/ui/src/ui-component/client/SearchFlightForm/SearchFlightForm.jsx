import { Button, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TripDate from './TripDate';
import validate from 'validate.js';
import { Search } from '@mui/icons-material';
import dayjs from 'dayjs';
// import PaxQty from './PaxQty';
import Airports from './Airports';
import { Fragment } from 'react';
import PaxQty from './PaxQty';
// import PaxQty from './PaxQty';

const SearchFlightForm = () => {
  const today = dayjs();
  // Search Details Information
  const [searchDto, setSearchDto] = useState({
    origin: '',
    destination: '',
    departDate: today,
    returnDate: today,
    tripType: 'roundtrip'
  });
  let isOneway = searchDto.tripType === 'oneway';
  // Validation
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isValid: false
  });

  const handleChange = (e, type) => {
    let fieldName;
    if (type === 'departDate' || type === 'returnDate') {
      /// Using DatePicker component onChange event
      /// DatePicker first parameter is value => e == value
      fieldName = type;
      setSearchDto((prev) => ({
        ...prev,
        [type]: e
      }));
    } else {
      fieldName = e.target.name;
      setSearchDto((prev) => ({
        ...prev,
        [fieldName]: e.target.value
      }));
    }

    setValidation((prev) => ({
      ...prev,
      touched: {
        ...prev.touched,
        [fieldName]: true
      }
    }));
  };
  // Validation schema
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const schema = {
    origin: {
      presence: {
        allowEmpty: false,
        message: '^Origin airport is required!' // ^: return exactly what inside "message"
      }
    },
    destination: {
      presence: {
        allowEmpty: false,
        message: '^Destination airport is required!'
      }
    },
    departDate: {
      presence: {
        allowEmpty: false,
        message: '^Departure date is required!'
      }
    },
    returnDate: {
      presence: {
        allowEmpty: searchDto.tripType === 'oneway',
        message: '^Return date is required on round trip flight!'
      }
    },
    tripType: {
      presence: {
        allowEmpty: false
      }
    }
  };

  const hasError = (field) => {
    try {
      return validation.touched[field] && validation.errors[field] ? true : false;
    } catch (e) {
      return true;
    }
  };

  useEffect(() => {
    const valid = setTimeout(() => {
      const errorsSchema = validate(searchDto, schema);
      let errors = { ...errorsSchema };

      errors.departDate = searchDto.departDate.isBefore(today.add(-1, 'day')) ? 'Departure date must be from now on' : '';

      if (isOneway) {
        delete errors.returnDate;
      } else {
        errors.returnDate = searchDto.departDate.isAfter(searchDto.returnDate)
          ? 'Return date must not be earlier than the departure date'
          : '';
      }
      let isValid;

      for (let key of Object.keys(errors)) {
        if (errors[key] !== '') {
          isValid = false;
          break;
        }
        isValid = true;
      }

      setValidation((prev) => ({
        ...prev,
        isValid: isValid,
        errors: errors || {}
      }));
    }, 200);

    return () => {
      clearTimeout(valid);
    };
  }, [isOneway, schema, searchDto, today]);

  const handleSubmit = () => {
    console.log(validation);
    let temp = { ...searchDto };

    temp.departDate = searchDto.departDate.format('YYYY-MM-DD');
    if (temp.tripType === 'oneway') {
      delete temp.returnDate;
    } else {
      temp.returnDate = searchDto.returnDate.format('YYYY-MM-DD');
    }
    console.log(temp);
  };

  const maxPax = 6;
  const [totalPax, setTotalPax] = useState({ adl: 1, chd: 0, inf: 0 });
  const handlePaxQty = (e) => {
    const regex = /^[0-9]+$/;
    let val = parseInt(e.target.value, 10);
    if (val >= 0 && regex.test(val)) {
      setTotalPax((prev) => ({
        ...prev,
        [e.target.name]: val
      }));
    } else {
      alert('invalid value');
    }
  };

  return (
    <Fragment>
      <Paper
        elevation={5}
        sx={{ display: 'block', alignItems: 'center', opacity: 0.96, p: 3, width: '80%', mt: 5 }}
        style={{ margin: '0 auto', marginTop: 50 }}
      >
        {/* Row 1: Select destinations for traveling */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <Airports
              origin={searchDto.origin}
              destination={searchDto.destination}
              airportChange={handleChange}
              onHasError={hasError}
              validation={validation}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <RadioGroup
              row
              sx={{ display: 'flex', justifyContent: 'right' }}
              aria-labelledby="ticket-type-label"
              name="tripType"
              defaultValue="roundtrip"
              onChange={handleChange}
            >
              <FormControlLabel
                value="roundtrip"
                control={<Radio color="secondary" />}
                label={<Typography color={isOneway ? '' : 'secondary'}>Roundtrip</Typography>}
                labelPlacement="top"
                color="secondary"
                sx={{ display: 'flex', justifyContent: 'center' }}
              />

              <FormControlLabel
                value="oneway"
                control={<Radio color="secondary" />}
                label={<Typography color={isOneway ? 'secondary' : ''}>Oneway</Typography>}
                labelPlacement="top"
                sx={{ display: 'flex', justifyContent: 'center' }}
              />
            </RadioGroup>
          </Grid>
          {/* Row 2: Select date for traveling */}
          <Grid item xs={12} sm={9}>
            <TripDate searchDto={searchDto} onChange={handleChange} validation={validation} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Grid container sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button
                color="secondary"
                sx={{
                  maxHeight: '80%',
                  p: 2,
                  width: { xs: '100%', sm: '90%' }
                }}
                variant="contained"
                size="large"
                onClick={handleSubmit}
                endIcon={<Search />}
                disabled={!validation.isValid}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          {/* Row 3: Select number of passengers for traveling */}
          {validation.isValid && <PaxQty maxPax={maxPax} totalPax={totalPax} onPaxChange={handlePaxQty} />}
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default SearchFlightForm;