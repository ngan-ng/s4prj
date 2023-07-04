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
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID
} from '@mui/material/styles';

import validate from 'validate.js';

const materialTheme = materialExtendTheme();

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
    dob: '',
    mobile: '',
    email: ''
  };

  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isValid: false
  });

  const [passenger, setPassenger] = useState(initialPassenger);

  const [title, setTitle] = useState('');

  useEffect(() => {
    const valid = setTimeout(() => {
      const errors = validate(passenger, schema);
      //console.log(errors);

      setValidation((prev) => ({
        ...prev,
        errors: errors || {},
        isValid: errors ? false : true
      }));
    }, 1000);

    return () => {
      clearTimeout(valid);
    };
  }, [passenger]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChange = (event) => {
    setPassenger((prev) => ({
      ...prev,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    }));

    setValidation((prev) => ({
      ...prev,
      touched: {
        ...prev.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const paxQty = JSON.parse(localStorage.getItem('paxQty'));
  const adl = Object.values(paxQty)[0];
  const chd = Object.values(paxQty)[1];
  const inf = Object.values(paxQty)[2];

  var formChd = [];
  var formAdl = [];

  const renderAdlComponent = () => {
    for (let i = 1; i <= adl; i++) {
      formAdl.push(
        <Grid container>
          <Grid item md={12}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 1 }}>
              <Typography sx={{ fontSize: 24 }}>Passenger</Typography>
              <Grid container spacing={2} sx={{ py: 3 }}>
                <Grid item xs={12} md={4}>
                  <FormControl sx={{ minWidth: 240 }}>
                    <InputLabel id="title-label">Title</InputLabel>
                    <Select labelId="title-label" id="title" value={title} label="Title" onChange={handleTitleChange}>
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
                    id="firstName"
                    name={'firstName' + i}
                    label="First Name"
                    variant="outlined"
                    value={passenger.firstName}
                    onChange={handleChange}
                    error={hasError('firstName')}
                    helperText={hasError('firstName') ? validation.errors.firstName[0] : null}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name={'lastName' + i}
                    label="Last Name"
                    variant="outlined"
                    value={passenger.lastName}
                    onChange={handleChange}
                    error={hasError('lastName')}
                    helperText={hasError('lastName') ? validation.errors.lastName[0] : null}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker defaultValue={dayjs(new Date())} value={passenger.dob} name={'dob' + i} onChange={handleChange} />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Typography sx={{ fontSize: 24, paddingTop: 3 }}>Contact Information</Typography>
              <Grid container spacing={2} sx={{ py: 3 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="mobile"
                    name={'mobile' + i}
                    label="Mobile"
                    variant="outlined"
                    value={passenger.mobile}
                    onChange={handleChange}
                    error={hasError('mobile')}
                    helperText={hasError('mobile') ? validation.errors.mobile[0] : null}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="email"
                    name={'email' + i}
                    label="Email"
                    variant="outlined"
                    value={passenger.email}
                    onChange={handleChange}
                    error={hasError('email')}
                    helperText={hasError('email') ? validation.errors.email[0] : null}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      );
    }

    formAdl.map((item, index) => (
      <Box key={index} sx={{ marginBottom: 3 }}>
        {item}
      </Box>
    ));

    return formAdl;
  };

  // const renderChdComponent = () => {
  //   for (let i = 1; i <= chd; i++) {
  //     formChd.push(
  //       <Box>
  //         <Grid container>
  //           <Grid item md={12}>
  //             <Paper elevation={4} sx={{ p: 3, borderRadius: 1 }}>
  //               <Typography sx={{ fontSize: 24 }}>Child</Typography>
  //               <Grid container spacing={2} sx={{ py: 3 }}>
  //                 <Grid item xs={12} md={4}>
  //                   <FormControl sx={{ minWidth: 240 }}>
  //                     <InputLabel id="title-label">Title</InputLabel>
  //                     <Select labelId="title-label" id="title" value={title} label="Title" onChange={handleTitleChange}>
  //                       <MenuItem value="MR">MR</MenuItem>
  //                       <MenuItem value="MS">MS</MenuItem>
  //                       <MenuItem value="MISS">MISS</MenuItem>
  //                       <MenuItem value="MSTR">MSTR</MenuItem>
  //                     </Select>
  //                   </FormControl>
  //                 </Grid>
  //                 <Grid item xs={12} md={8}>
  //                   <TextField fullWidth id="firstName" label="First Name" variant="outlined" />
  //                 </Grid>
  //               </Grid>
  //               <Grid container spacing={2}>
  //                 <Grid item xs={12} md={4}>
  //                   <TextField fullWidth id="lastName" label="Last Name" variant="outlined" />
  //                 </Grid>
  //                 <Grid item xs={12} md={8}>
  //                   <LocalizationProvider dateAdapter={AdapterDayjs}>
  //                     <DatePicker defaultValue={dayjs(new Date())} />
  //                   </LocalizationProvider>
  //                 </Grid>
  //               </Grid>
  //               <Typography sx={{ fontSize: 24, paddingTop: 3 }}>Contact Information</Typography>
  //               <Grid container spacing={2} sx={{ py: 3 }}>
  //                 <Grid item xs={12} md={6}>
  //                   <TextField fullWidth id="mobile" label="Mobile" variant="outlined" />
  //                 </Grid>
  //                 <Grid item xs={12} md={6}>
  //                   <TextField fullWidth id="email" label="Email" variant="outlined" />
  //                 </Grid>
  //               </Grid>
  //             </Paper>
  //           </Grid>
  //         </Grid>
  //       </Box>
  //     );
  //   }

  //   formChd.map((item, index) => <div key={index}>{item}</div>);

  //   return formChd;
  // };

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <div>{renderAdlComponent()}</div>
      {/**{formChd != null && <div>{renderChdComponent()}</div>} */}
    </MaterialCssVarsProvider>
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
