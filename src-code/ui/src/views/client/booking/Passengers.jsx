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
import { useDispatch } from 'react-redux';
import { createPassengerStart } from 'store/passenger/passenger.action';

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
  },
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
  },
  associate: {
    presence: {
      allowEmpty: false,
      message: '^Associate infant to adult passenger is not blank'
    }
  }
};

const paxQty = JSON.parse(localStorage.getItem('paxQty'));
const adl = Object.values(paxQty ?? 0)[0];
const chd = Object.values(paxQty ?? 0)[1];
const inf = Object.values(paxQty ?? 0)[2];

const Passengers = () => {
  const today = dayjs();
  const dispatch = useDispatch();

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

  for (let i = 0; i < adl; i++) {
    // if (i === 0) {
    //   initialBookings = [...initialBookings, { ...initialPassenger, gender: 'ADL', email: '', mobile: '' }];
    // } else {
    initialBookings = [...initialBookings, { ...initialPassenger, gender: 'ADL' }];
    // }
    initialValidations = [...initialValidations, { ...initialValidation }];
  }
  for (let i = 0; i < chd; i++) {
    initialBookings = [...initialBookings, { ...initialPassenger, gender: 'CHD' }];
    initialValidations = [...initialValidations, { ...initialValidation }];
  }
  for (let i = 0; i < inf; i++) {
    initialBookings = [...initialBookings, { ...initialPassenger, gender: 'INF' }];
    initialValidations = [...initialValidations, { ...initialValidation }];
  }

  const [bookings, setBookings] = useState(initialBookings);

  const [validations, setValidations] = useState(initialValidations);

  const [fullName, setFullName] = useState([]);

  const handleChange = (event, index, type) => {
    let dataBooking = [...bookings];
    // console.log('dataBooking', dataBooking);
    let dataValidate = [...validations];

    // console.log('dataValidate', dataValidate);

    let fieldName;

    if (type === 'dob') {
      //fieldName = type;
      dataBooking[index][type] = event;
      setBookings(dataBooking);

      dataValidate[index] = { ...validations[index], touched: { [type]: true } };
      // console.log(dataValidate);
      setValidations(dataValidate);
    } else {
      fieldName = event.target.name.split('_')[0];
      dataBooking[index][fieldName] = event.target.value;
      setBookings(dataBooking);

      dataValidate[index] = { ...validations[index], touched: { ...validations[index].touched, [fieldName]: true } };
      setValidations(dataValidate);
    }
  };

  useEffect(() => {
    let dataValidate = [...validations];

    bookings.map((b, index) => {
      const err = validate(b, schema);
      dataValidate[index] = { ...validations[index], isValid: err ? false : true, errors: err || {} };
      setValidations(dataValidate);
    });
    console.log(dataValidate);
  }, [bookings]);

  const hasError = (field, index) => {
    return validations[index].touched[field] && validations[index].errors[field] ? true : false;
  };

  const handleName = (event, index) => {
    const isGender = ['ADL'];
    var getNameADL = bookings.filter((b) => isGender.includes(b.gender));
    setFullName(getNameADL);
  };

  console.log(bookings);

  dispatch(createPassengerStart(bookings));

  let minDobINF = today.subtract(2, 'year');
  let maxDobINF = today.subtract(9, 'day');
  let minDobCHD = today.subtract(12, 'year');
  let maxDobCHD = today.subtract(2, 'year');
  let maxDobADL = today.subtract(12, 'year');

  return (
    <Fragment>
      {bookings.map((pax, index) => (
        <Grid key={index} container sx={{ marginBottom: 3 }}>
          <Grid item md={12}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 1 }}>
              {pax.gender == 'ADL' ? (
                <Typography key={index} sx={{ fontSize: 24 }}>
                  ADL
                </Typography>
              ) : (
                [
                  pax.gender == 'CHD' ? (
                    <Typography key={index} sx={{ fontSize: 24 }}>
                      CHD
                    </Typography>
                  ) : (
                    <Typography key={index} sx={{ fontSize: 24 }}>
                      INF
                    </Typography>
                  )
                ]
              )}

              {pax.gender == 'INF' ? (
                <Fragment>
                  <Grid container spacing={2} sx={{ py: 3 }}>
                    <Grid item xs={12} md={8}>
                      <FormControl fullWidth error={hasError('associate', index)}>
                        <InputLabel id="associate-label">Associate infant to adult passenger</InputLabel>

                        <Select
                          variant="filled"
                          labelId="associate-label"
                          //value={''}
                          defaultValue=""
                          label="associate"
                          onChange={(event) => handleChange(event, index)}
                          name={'associate_' + index}
                        >
                          {fullName.map((item, index) => (
                            <MenuItem key={index} value={item.firstName}>
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
                          <MenuItem value="MR">MR</MenuItem>
                          <MenuItem value="MS">MS</MenuItem>
                          <MenuItem value="MISS">MISS</MenuItem>
                          <MenuItem value="MSTR">MSTR</MenuItem>
                        </Select>
                        {hasError(`title_${index}`, index) && (
                          <FormHelperText>
                            {validations[index].errors !== undefined ? validations[index].errors.title[0] : ''}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Day of birth"
                          //defaultValue={dayjs(new Date())}
                          value={pax.dob}
                          name="dob"
                          onChange={(event) => handleChange(event, index, 'dob')}
                          minDate={minDobINF}
                          maxDate={maxDobINF}
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
                </Fragment>
              ) : (
                <Fragment>
                  <Grid container spacing={2} sx={{ py: 3 }}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth error={hasError('title', index)}>
                        <InputLabel id="title-label">Title</InputLabel>
                        <Select
                          variant="filled"
                          labelId="title-label"
                          value={pax.title}
                          label="Title"
                          onChange={(event) => handleChange(event, index)}
                          name={'title_' + index}
                        >
                          <MenuItem value="MR">MR</MenuItem>
                          <MenuItem value="MS">MS</MenuItem>
                          <MenuItem value="MISS">MISS</MenuItem>
                          <MenuItem value="MSTR">MSTR</MenuItem>
                        </Select>
                        {hasError(`title_${index}`, index) && (
                          <FormHelperText>
                            {validations[index].errors !== undefined ? validations[index].errors.title[0] : ''}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        name="firstName"
                        label="First Name"
                        variant="filled"
                        value={pax.firstName}
                        onChange={(event) => {
                          handleChange(event, index);
                          handleName(event, index);
                        }}
                        error={hasError('firstName', index)}
                        helperText={hasError('firstName', index) ? validations[index].errors.firstName[0] : null}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        variant="filled"
                        value={pax.lastName}
                        onChange={(event) => {
                          handleChange(event, index);
                          handleName(event, index);
                        }}
                        error={hasError('lastName', index)}
                        helperText={hasError('lastName', index) ? validations[index].errors.lastName[0] : null}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Day of birth"
                          //defaultValue={dayjs(new Date())}
                          value={pax.dob}
                          name="dob"
                          onChange={(event) => handleChange(event, index, 'dob')}
                          minDate={pax.gender == 'CHD' ? minDobCHD : ''}
                          maxDate={pax.gender == 'CHD' ? maxDobCHD : maxDobADL}
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
                </Fragment>
              )}

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
