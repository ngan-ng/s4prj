import { Button, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TripDate from './TripDate';
import validate from 'validate.js';
import { Search } from '@mui/icons-material';
import dayjs from 'dayjs';
// import PaxQty from './PaxQty';
import Airports from './Airports';
import { Fragment } from 'react';
import PaxQty from './PaxQty';
import {useDispatch} from "react-redux";
import {sendSearchDtoStart} from "../../../store/flight/flight.action";
// import PaxQty from './PaxQty';

const SearchFlightForm = ({ backgroundOpacity }) => {
  const dispatch = useDispatch();
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
    const timeout = setTimeout(() => {
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
      clearTimeout(timeout);
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

    dispatch(sendSearchDtoStart(temp));
    console.log("temp:", temp);
  };

  const maxPax = 6;
  const [paxQty, setPaxQty] = useState({ adl: 1, chd: 0, inf: 0 });
  const [paxQtyErr, setPaxQtyErr] = useState({ adl: '', chd: '', inf: '' });
  const handlePaxQty = (e) => {
    const fieldName = e.target.name;
    let val = parseInt(e.target.value, 10);
    let currentQty = paxQty.adl + paxQty.chd;
    // const regex = /^[0-9]+$/;
    // if (!regex.test(val)) {
    //   setPaxQtyErr((prev) => ({
    //     ...prev,
    //     fieldName: 'Please input a number'
    //   }));
    //   e.preventDefault();
    // }

    val = val > 0 ? val : fieldName === 'adl' ? 1 : 0;

    if (val + currentQty > maxPax) {
      setPaxQtyErr((prev) => ({
        ...prev,
        [fieldName]: `Max: 6 passengers per booking. Only ${maxPax - currentQty} ${fieldName} left`
      }));
      e.preventDefault();
      return;
    }

    setPaxQty((prev) => ({
      ...prev,
      [e.target.name]: val
    }));
    setPaxQtyErr((prev) => ({
      ...prev,
      [fieldName]: ''
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
        {/* Row 1: Select destinations for traveling */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Airports
              origin={searchDto.origin}
              destination={searchDto.destination}
              airportChange={handleChange}
              onHasError={hasError}
              validation={validation}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
            <RadioGroup
              row
              sx={{ display: 'flex', justifyContent: 'center' }}
              aria-labelledby="ticket-type-label"
              name="tripType"
              defaultValue="roundtrip"
              onChange={handleChange}
              spacing={1}
            >
              <FormControlLabel
                value="roundtrip"
                control={<Radio color="secondary" />}
                label={<Typography color={isOneway ? '' : 'secondary'}>Roundtrip</Typography>}
                labelPlacement="top"
                color="secondary"
              />
              <FormControlLabel
                value="oneway"
                control={<Radio color="secondary" />}
                label={<Typography color={isOneway ? 'secondary' : ''}>Oneway</Typography>}
                labelPlacement="top"
              />
            </RadioGroup>
          </Grid>
          {/* Row 2: Select date for traveling */}
          <Grid item xs={12} sm={8}>
            <TripDate searchDto={searchDto} onChange={handleChange} validation={validation} />
          </Grid>
          <Grid item xs={12} sm={4}>
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
                onClick={handleSubmit}
                endIcon={<Search />}
                disabled={!validation.isValid}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          {/* Row 3: Select number of passengers for traveling */}
          {validation.isValid && (
            <>
              <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <PaxQty maxPax={maxPax} paxQty={paxQty} onPaxChange={handlePaxQty} paxQtyErr={paxQtyErr} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                  <TextField
                    variant="filled"
                    label={
                      <Typography color="white" fontSize={18} fontWeight="bold">
                        Total
                      </Typography>
                    }
                    aria-readonly
                    value={paxQty.adl + paxQty.chd + paxQty.inf + ' Passengers'}
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
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default SearchFlightForm;
