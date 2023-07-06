/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import validate from 'validate.js';
import { Fragment } from 'react';

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
  }
};

const Passengers = () => {
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

  const paxQty = JSON.parse(localStorage.getItem('paxQty'));
  const adl = Object.values(paxQty)[0];
  const chd = Object.values(paxQty)[1];
  const inf = Object.values(paxQty)[2];

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

  const handleChange = (event, index, type) => {
    let dataBooking = [...bookings];
    console.log('dataBooking', dataBooking);
    let dataValidate = [...validations];

    console.log('dataValidate', dataValidate);

    let fieldName;

    if (type === 'dob') {
      //fieldName = type;
      dataBooking[index][type] = event;
      setBookings(dataBooking);

      setValidations((prev) => ({
        ...prev,
        touched: {
          ...prev.touched,
          [type]: true
        }
      }));
    } else {
      fieldName = event.target.name;
      dataBooking[index][event.target.name] = event.target.value;
      setBookings(dataBooking);

      setValidations((prev) => ({
        ...prev,
        touched: {
          ...prev.touched,
          [event.target.name]: true
        }
      }));
      console.log('validations', validations);
    }
  };

  console.log('bookings', bookings);
  console.log('validations', validations);

  useEffect(() => {
    const valid = setTimeout(() => {
      var err = [];
      bookings.map((b, index) => {
        console.log('b', b);
        const errors = validate(b, schema);
        err = errors;
        validations.map((v, index) => {
          console.log('v', v);
          console.log('err', err);

          setValidations((prev) => ({
            ...prev[index],
            errors: err || {},
            isValid: err ? false : true
          }));

          // index
        });
      });
    }, 0);

    return () => {
      clearTimeout(valid);
    };
  }, [bookings, validations]);

  const hasError = (field, index) => {
    console.log(index);
    return validations[index].touched[field] && validations[index].errors[field] ? true : false;
  };

  return (
    <Fragment>
      {bookings.map((pax, index) => (
        <Grid key={index} container sx={{ marginBottom: 3 }}>
          <Grid item md={12}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 1 }}>
              <Typography sx={{ fontSize: 24 }}>Passenger {index + 1}</Typography>
              <Grid container spacing={2} sx={{ py: 3 }}>
                <Grid item xs={12} md={4}>
                  <FormControl
                    fullWidth
                    error={hasError('title', index)}
                    helpertext={hasError('title', index) ? validations[index].errors.title[0] : null}
                  >
                    <InputLabel id="title-label">Title</InputLabel>
                    <Select
                      variant="filled"
                      labelId="title-label"
                      value={pax.title}
                      label="Title"
                      onChange={(event) => handleChange(event, index)}
                      name="title"
                    >
                      <MenuItem value="MR">MR</MenuItem>
                      <MenuItem value="MS">MS</MenuItem>
                      <MenuItem value="MISS">MISS</MenuItem>
                      <MenuItem value="MSTR">MSTR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
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
              </Grid>
              <Grid container spacing={2}>
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
                <Grid item xs={12} md={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      variant="filled"
                      defaultValue={dayjs(new Date())}
                      value={pax.dob}
                      name="dob"
                      onChange={(event) => handleChange(event, index, 'dob')}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
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

  ///////////////////////////////////////////////////////////////////////

  // const initialPassenger = {
  //   title: '',
  //   firstName: '',
  //   lastName: '',
  //   dob: '',
  //   mobile: '',
  //   email: ''
  // };

  // const [formFields, setFormFields] = useState([initialPassenger]);

  // const handleFormChange = (event, index, type) => {
  //   let data = [...formFields];
  //   console.log(event);
  //   let fieldName;

  //   if (type === 'dob') {
  //     //fieldName = type;
  //     data[index][type] = event;
  //     setFormFields(data);
  //   } else {
  //     fieldName = event.target.name;
  //     data[index][event.target.name] = event.target.value;
  //     setFormFields(data);
  //   }

  //   setFormFields(data);
  // };

  // const submit = (e) => {
  //   e.preventDefault();
  //   console.log(formFields);
  // };

  // const addFields = () => {
  //   let object = {
  //     title: '',
  //     firstName: '',
  //     lastName: '',
  //     dob: '',
  //     mobile: '',
  //     email: ''
  //   };

  //   setFormFields([...formFields, object]);
  // };

  // return (
  //   <div>
  //     <form onSubmit={submit}>
  //       <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
  //         {formFields.map((item, index) => {
  //           return (
  //             <Box key={index} sx={{ marginBottom: 3 }}>
  //               <Grid container>
  //                 <Grid item md={12}>
  //                   <Paper elevation={4} sx={{ p: 3, borderRadius: 1 }}>
  //                     <Typography sx={{ fontSize: 24 }}>Passenger</Typography>
  //                     <Grid container spacing={2} sx={{ py: 3 }}>
  //                       <Grid item xs={12} md={4}>
  //                         <FormControl fullWidth>
  //                           <InputLabel id="title-label">Title</InputLabel>
  //                           <Select
  //                             defaultValue=""
  //                             labelId="title-label"
  //                             id="title"
  //                             label="Title"
  //                             value={formFields.title}
  //                             onChange={(event) => handleFormChange(event, index)}
  //                           >
  //                             <MenuItem name="MR" value="MR">
  //                               MR
  //                             </MenuItem>
  //                             <MenuItem name="MS" value="MS">
  //                               MS
  //                             </MenuItem>
  //                             <MenuItem name="MISS" value="MISS">
  //                               MISS
  //                             </MenuItem>
  //                             <MenuItem name="MSTR" value="MSTR">
  //                               MSTR
  //                             </MenuItem>
  //                           </Select>
  //                         </FormControl>
  //                       </Grid>
  //                       <Grid item xs={12} md={8}>
  //                         <TextField
  //                           id="firstName"
  //                           name="firstName"
  //                           label="First Name"
  //                           variant="outlined"
  //                           value={item.firstName}
  //                           onChange={(event) => handleFormChange(event, index)}
  //                           // error={hasError('firstName')}
  //                           // helperText={hasError('firstName') ? validation.errors.firstName[0] : null}
  //                         />
  //                       </Grid>
  //                     </Grid>
  //                     <Grid container spacing={2}>
  //                       <Grid item xs={12} md={4}>
  //                         <TextField
  //                           fullWidth
  //                           id="lastName"
  //                           name="lastName"
  //                           label="Last Name"
  //                           variant="outlined"
  //                           value={item.lastName}
  //                           onChange={(event) => handleFormChange(event, index)}
  //                           // error={hasError('lastName')}
  //                           // helperText={hasError('lastName') ? validation.errors.lastName[0] : null}
  //                         />
  //                       </Grid>
  //                       <Grid item xs={12} md={8}>
  //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
  //                           <DatePicker
  //                             renderInPut={(params) => <TextField {...params} />}
  //                             value={item.dob}
  //                             name="dob"
  //                             onChange={(event) => handleFormChange(event, index, 'dob')}
  //                           />
  //                         </LocalizationProvider>
  //                       </Grid>
  //                     </Grid>
  //                     <Typography sx={{ fontSize: 24, paddingTop: 3 }}>Contact Information</Typography>
  //                     <Grid container spacing={2} sx={{ py: 3 }}>
  //                       <Grid item xs={12} md={6}>
  //                         <TextField
  //                           fullWidth
  //                           id="mobile"
  //                           name="mobile"
  //                           label="Mobile"
  //                           variant="outlined"
  //                           value={item.mobile}
  //                           onChange={(event) => handleFormChange(event, index)}
  //                           // error={hasError('mobile')}
  //                           // helperText={hasError('mobile') ? validation.errors.mobile[0] : null}
  //                         />
  //                       </Grid>
  //                       <Grid item xs={12} md={6}>
  //                         <TextField
  //                           fullWidth
  //                           id="email"
  //                           name="email"
  //                           label="Email"
  //                           variant="outlined"
  //                           value={item.email}
  //                           onChange={(event) => handleFormChange(event, index)}
  //                           // error={hasError('email')}
  //                           // helperText={hasError('email') ? validation.errors.email[0] : null}
  //                         />
  //                       </Grid>
  //                     </Grid>
  //                   </Paper>
  //                 </Grid>
  //               </Grid>
  //             </Box>
  //           );
  //         })}
  //       </MaterialCssVarsProvider>
  //     </form>
  //     <button onClick={addFields}>Add More..</button>
  //     <br />
  //     <button onClick={submit}>Submit</button>
  //   </div>
  // );
};

export default Passengers;
