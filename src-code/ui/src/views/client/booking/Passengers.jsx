/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FormHelperText, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import validate from 'validate.js';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectPassengers } from 'store/passenger/passenger.selector';
import { useCallback } from 'react';

const schema = {
  title: {
    presence: {
      allowEmpty: false,
      message: '^Title is not blank'
    }
  },
  firstName: {
    presence: {
      allowEmpty: false,
      message: '^First name is not blank'
    },
    length: {
      minimum: 1,
      maximum: 255
    }
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: '^Last name is not blank'
    },
    length: {
      minimum: 1,
      maximum: 255
    }
  },
  dob: {
    presence: {
      allowEmpty: false,
      message: '^Date of birth is not blank'
    }
  }
};
const adlPrimarySchema = {
  mobile: {
    presence: {
      allowEmpty: false,
      message: '^Mobile is not blank'
    },
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  },
  email: {
    presence: {
      allowEmpty: false,
      message: '^Email is not blank'
    }
  }
};
const infExtSchema = {
  associate: {
    presence: {
      allowEmpty: false,
      message: '^Associate infant to adult passenger is not blank'
    }
  }
};

const Passengers = ({ onHandleFullfill, onFormValid }) => {
  const paxQty = JSON.parse(localStorage.getItem('paxQty'));
  const adl = paxQty?.adl;
  const chd = paxQty?.chd;
  const inf = paxQty?.inf;

  const today = dayjs();
  const passengers = useSelector(selectPassengers);

  const initialPassenger = {
    title: '',
    firstName: '',
    lastName: '',
    dob: ''
  };

  const initialValidation = {
    touched: {},
    errors: {},
    isValid: false
  };

  let initialBookings = [];
  let initialValidations = [];
  const paxNotExist = passengers === undefined || passengers === null;
  const genInitialBookings = useCallback(() => {
    for (let i = 0; i < adl; i++) {
      if (paxNotExist) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        initialBookings = [...initialBookings, { ...initialPassenger, gender: 'ADL' }];
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      initialValidations = [...initialValidations, { ...initialValidation }];
    }
    for (let i = 0; i < chd; i++) {
      if (paxNotExist) {
        initialBookings = [...initialBookings, { ...initialPassenger, gender: 'CHD' }];
      }
      initialValidations = [...initialValidations, { ...initialValidation }];
    }
    for (let i = 0; i < inf; i++) {
      if (paxNotExist) {
        initialBookings = [...initialBookings, { ...initialPassenger, gender: 'INF' }];
      }
      initialValidations = [...initialValidations, { ...initialValidation }];
    }
  }, []);
  genInitialBookings();
  const [bookings, setBookings] = useState(paxNotExist ? initialBookings : passengers);

  const [validations, setValidations] = useState(initialValidations);

  const handleChange = (event, index, type) => {
    let dataBooking = [...bookings];
    let dataValidate = [...validations];

    let fieldName;

    if (type === 'dob') {
      //fieldName = type;
      // console.log(event);
      dataBooking[index][type] = event;
      setBookings(dataBooking);
      dataValidate[index] = { ...validations[index], touched: { [type]: true } };
      setValidations(dataValidate);
    } else {
      fieldName = event.target.name.split('_')[0];
      if (fieldName === 'associate') {
        const val = event.target.value.split('_');
        // console.log(val);
        dataBooking[index][fieldName] = val[0];
      } else {
        dataBooking[index][fieldName] = event.target.value;
      }
      setBookings(dataBooking);
      dataValidate[index] = { ...validations[index], touched: { ...validations[index].touched, [fieldName]: true } };
      setValidations(dataValidate);
    }
  };
  const handleFormValid = useCallback(() => {
    if (bookings === undefined || bookings === null) {
      return false;
    }
    return bookings?.filter((element) => Object.values(element)?.filter((val) => val.toString().trim() === '').length > 0).length > 0;
  }, [bookings]);

  useEffect(() => {
    let invalid = handleFormValid();
    onFormValid(!invalid);
    if (!invalid) {
      onHandleFullfill(bookings);
    }
  }, [bookings, handleFormValid, onFormValid, onHandleFullfill]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let dataValidate = [...validations];

      bookings.map((b, index) => {
        let err = {};
        const commonErr = validate(b, schema);
        err = { ...commonErr };
        if (b.gender === 'ADL' && index === 0) {
          const adlPrimaryErr = validate(b, adlPrimarySchema);
          err = { ...err, ...adlPrimaryErr };
        }
        if (b.gender === 'INF') {
          const infErr = validate(b, infExtSchema);
          err = { ...err, ...infErr };
        }
        dataValidate[index] = {
          ...validations[index],
          isValid: Object.keys(err).length !== 0 ? false : true,
          errors: err || {}
        };
        setValidations(dataValidate);
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [bookings]);

  const hasError = (field, index) => {
    return validations[index]?.touched[field] && validations[index]?.errors[field] ? true : false;
  };

  const minDobINF = today.subtract(2, 'year');
  const maxDobINF = today.subtract(9, 'day');
  const minDobCHD = today.subtract(12, 'year');
  const maxDobCHD = today.subtract(2, 'year');
  const maxDobADL = today.subtract(12, 'year');

  return (
    <Fragment>
      {bookings.map((pax, index) => (
        <Grid key={index} container sx={{ marginBottom: 3 }}>
          <Grid item md={12}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 1 }}>
              {pax.gender == 'ADL' ? (
                <Typography key={index} sx={{ fontSize: 24 }}>
                  ADULT
                </Typography>
              ) : (
                [
                  pax.gender == 'CHD' ? (
                    <Typography key={index} sx={{ fontSize: 24 }}>
                      CHILD
                    </Typography>
                  ) : (
                    <Typography key={index} sx={{ fontSize: 24 }}>
                      INFANT
                    </Typography>
                  )
                ]
              )}
              <Fragment>
                <Grid container spacing={2} sx={{ py: 3 }}>
                  {pax.gender == 'INF' && (
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="associate-label">Associating passenger</InputLabel>
                        <Select
                          variant="filled"
                          labelId="associate-label"
                          label="associate"
                          onChange={(event) => handleChange(event, index)}
                          name={'associate_' + index}
                          defaultValue={''}
                        >
                          <MenuItem value={''}>None</MenuItem>
                          {bookings
                            .filter((b) => b.gender === 'ADL')
                            ?.map((item, i) => (
                              <MenuItem key={i} value={i + '_' + item.firstName}>
                                {item.firstName}
                              </MenuItem>
                            ))}
                        </Select>
                        {hasError(`associate_${index}`, index) && (
                          <FormHelperText>
                            {validations[index].errors !== undefined ? validations[index].errors.associate[0] : ''}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  )}
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth error={hasError('title', index)}>
                      <InputLabel id="title-label">Title</InputLabel>
                      <Select
                        //defaultValue="MR"
                        variant="filled"
                        labelId="title-label"
                        value={pax.title}
                        label="Title"
                        onChange={(event) => handleChange(event, index)}
                        name={'title_' + index}
                      >
                        {pax.gender === 'ADL' && <MenuItem value="MR">MR</MenuItem>}
                        {pax.gender === 'ADL' && <MenuItem value="MS">MS</MenuItem>}
                        {pax.gender !== 'ADL' && <MenuItem value="MISS">MISS</MenuItem>}
                        {pax.gender !== 'ADL' && <MenuItem value="MSTR">MSTR</MenuItem>}
                      </Select>
                      {hasError(`title_${index}`, index) && (
                        <FormHelperText>{validations[index].errors !== undefined ? validations[index].errors.title[0] : ''}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of birth"
                        //defaultValue={dayjs(new Date())}
                        value={dayjs(pax?.dob)}
                        name={'dob_' + index}
                        onChange={(event) => handleChange(event, index, 'dob')}
                        defaultCalendarMonth={pax.gender === 'INF' ? maxDobINF : pax.gender === 'CHD' ? maxDobCHD : maxDobADL}
                        minDate={pax.gender === 'INF' ? minDobINF : pax.gender === 'CHD' ? minDobCHD : null}
                        maxDate={pax.gender === 'INF' ? maxDobINF : pax.gender === 'CHD' ? maxDobCHD : maxDobADL}
                        slotProps={{
                          textField: {
                            variant: 'filled',
                            helperText: hasError('dob', index) ? validations[index].errors.dob[0] : null
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      variant="filled"
                      value={pax.firstName}
                      onChange={(event) => handleChange(event, index)}
                      error={hasError('firstName', index)}
                      helperText={hasError('firstName', index) ? validations[index].errors.firstName[0] : null}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      variant="filled"
                      value={pax.lastName}
                      onChange={(event) => handleChange(event, index)}
                      error={hasError('lastName', index)}
                      helperText={hasError('lastName', index) ? validations[index].errors.lastName[0] : null}
                    />
                  </Grid>
                </Grid>
              </Fragment>
              {index == 0 && (
                <Fragment>
                  <Typography sx={{ fontSize: 24, paddingTop: 3 }}>Contact Information</Typography>
                  <Grid container spacing={2} sx={{ py: 3 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        name="mobile"
                        label="Mobile"
                        variant="filled"
                        value={pax.mobile}
                        onChange={(event) => handleChange(event, index)}
                        error={hasError('mobile', index)}
                        helperText={hasError('mobile', index) ? validations[index].errors.mobile[0] : null}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        variant="filled"
                        value={pax.email}
                        onChange={(event) => handleChange(event, index)}
                        error={hasError('email', index)}
                        helperText={hasError('email', index) ? validations[index].errors.email[0] : null}
                      />
                    </Grid>
                  </Grid>
                </Fragment>
              )}
            </Paper>
          </Grid>
        </Grid>
      ))}
    </Fragment>
  );
};

export default Passengers;
