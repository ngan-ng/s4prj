import { Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import TripDate from './TripDate';
import validate from 'validate.js';
import dayjs from 'dayjs';
import Airports from './Airports';
import { Fragment } from 'react';
import PaxQty from './PaxQty';
import axiosCall from 'api/callAxios';
import SubmitButton from './SubmitButton';
import TotalPax from './TotalPax';
import TripTypeButton from './TripTypeButton';

// eslint-disable-next-line react/prop-types
const SearchFlightForm = ({ backgroundOpacity }) => {
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

  const maxPax = 6;
  const [paxQty, setPaxQty] = useState({ adl: 1, chd: 0, inf: 0 });
  const [isQtyValid, setIsQtyValid] = useState(true);
  const handlePaxQty = (e) => {
    const fieldName = e.target.name;
    let val = parseInt(e.target.value, 10);
    let validMaxPax = true;
    let validInf = true;
    val = val > 0 ? val : 0;
    switch (fieldName) {
      case 'adl':
        val = val !== 0 ? val : 1;
        if (val < paxQty.inf) {
          setPaxQty((prev) => ({
            ...prev,
            inf: val
          }));
        }
        validMaxPax = val + paxQty.chd <= maxPax;
        break;
      case 'chd':
        validMaxPax = val + paxQty.adl <= maxPax;
        break;
      case 'inf':
        validInf = val <= paxQty.adl;
        val = val > paxQty.adl ? paxQty.adl : val;
        validMaxPax = paxQty.adl + paxQty.chd <= maxPax;
        break;
    }
    if (validMaxPax && validInf) {
      // Valid cases
      setPaxQty((prev) => ({
        ...prev,
        [fieldName]: val
      }));
      setIsQtyValid(true);
    } else {
      // Error cases
      setIsQtyValid(false);
      e.preventDefault();
    }
  };

  const handleSubmit = async () => {
    console.log(validation);
    let temp = { ...searchDto };

    temp.departDate = searchDto.departDate.set('hour', 0).set('minute', 0).format('YYYY-MM-DDTHH:mm');
    if (temp.tripType === 'oneway') {
      delete temp.returnDate;
    } else {
      temp.returnDate = searchDto.returnDate.set('hour', 0).set('minute', 0).format('YYYY-MM-DDTHH:mm');
    }
    console.log(temp);
    await axiosCall
      .post('/api-v1/guest/flight/search', temp)
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem('paxQty', JSON.stringify(paxQty));
        console.log(JSON.parse(localStorage.getItem('paxQty')));
      })
      .catch((errSubmit) => {
        console.log(errSubmit);
      });
  };
  const total = Object.values(paxQty).reduce((a, b) => a + b);

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
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TripTypeButton isOneway={isOneway} onTypeChange={handleChange} />
          </Grid>
          {/* Row 2: Select date for traveling */}
          <Grid item xs={12} sm={8}>
            <TripDate searchDto={searchDto} onChange={handleChange} validation={validation} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SubmitButton validation={validation} onSubmit={handleSubmit} />
          </Grid>
          {/* Row 3: Select number of passengers for traveling */}
          {validation.isValid && (
            <>
              <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <PaxQty maxPax={maxPax} paxQty={paxQty} onPaxChange={handlePaxQty} isQtyValid={isQtyValid} />
              </Grid>
              {/* Total passengers Sum-up */}
              <Grid item xs={12} md={4}>
                <TotalPax total={total} />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default SearchFlightForm;
