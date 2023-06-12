// import { Grid, InputAdornment, TextField, Typography } from '@mui/material';
// import { Fragment, useState } from 'react';
// import { Person } from '@mui/icons-material';
// const PaxQty = () => {
//   const maxPax = 9;
//   const [paxQty, setPaxQty] = useState({ adl: 1, chd: 0, inf: 0 });
//   const handlePaxQty = (e) => {
//     setPaxQty((prev) => ({
//       ...prev,
//       [e.target.name]: parseInt(e.target.value, 10)
//     }));
//   };
//   return (
//     <Fragment>
//       <Grid item xs={12}>
//         <Typography>Passenger</Typography>
//       </Grid>
//       <Grid item xs={12} sm={4}>
//         <TextField
//           type={Number}
//           inputProps={{ min: 0, max: maxPax - paxQty.chd, step: 1 }}
//           value={paxQty.adl}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Person color="secondary" />
//               </InputAdornment>
//             )
//           }}
//           onChange={handlePaxQty}
//         />

//         {/* <FormControl variant="filled" fullWidth>
//           <InputLabel id="adl-label">Adult</InputLabel>
//           <Select
//             labelId="adl-label"
//             id="pax-qty"
//             value={origin}
//             defaultValue={1}
//             label="Adult"
//             name="adl"
//             onChange={handlePaxQty}
//             required={true}
//             IconComponent={() => <Person2 sx={{ m: 1.5 }} color="secondary" />}
//           >
//             <MenuItem numeric value={0}>None</MenuItem>

//           </Select>

//           <FormHelperText style={{ color: "red" }}></FormHelperText>
//         </FormControl> */}
//       </Grid>
//       <Grid item xs={12} sm={4}>
//         {/* <FormControl variant="filled" fullWidth>
//           <InputLabel id="adl-label">Children</InputLabel>
//           <Select
//             labelId="adl-label"
//             id="pax-qty"
//             value={origin}
//             defaultValue={1}
//             label="Adult"
//             name="adl"
//             onChange={handlePaxQty}
//             required={true}
//             IconComponent={() => <Person2 sx={{ m: 1.5 }} color="secondary" />}
//           >
//             <MenuItem value={''}>None</MenuItem>
//           </Select>

//           <FormHelperText style={{ color: 'red' }}></FormHelperText>
//         </FormControl> */}
//       </Grid>
//       <Grid item xs={12} sm={4}>
//         {/* <FormControl variant="filled" fullWidth>
//           <InputLabel id="adl-label">Infant</InputLabel>
//           <Select
//             labelId="adl-label"
//             id="pax-qty"
//             value={origin}
//             defaultValue={`1`}
//             label="Adult"
//             name="adl"
//             onChange={handlePaxQty}
//             required={true}
//             IconComponent={() => <Person2 sx={{ m: 1.5 }} color="secondary" />}
//           >
//             <MenuItem value={''}>None</MenuItem>
//           </Select>

//           <FormHelperText style={{ color: 'red' }}></FormHelperText>
//         </FormControl> */}
//       </Grid>
//     </Fragment>
//   );
// };

// export default PaxQty;
