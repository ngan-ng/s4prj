// import {
//     FormControl,
//     FormHelperText,
//     Grid,
//     InputAdornment,
//     InputLabel,
//     MenuItem,
//     Select,
//     TextField,
//     Typography,
// } from "@mui/material";
// import { Fragment, useState } from "react";
// import {Person2, Person4 } from "@mui/icons-material";
// const PaxQty = () => {
//     const maxPax = 9;
//     const [paxQty, setPaxQty] = useState({ adl: 1, chd: 0, inf: 0 });
//     const handlePaxQty = () => {};
//     return (
//         <Fragment>
//             <Grid item xs={12}><Typography>Passenger</Typography></Grid>
//             <Grid item xs={12} sm={4}>
//                 <TextField
//
//                     type={Number}
//                     inputProps={{ min: 0,max: 9 }}
//                     value={1}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <Person4 color="secondary" />
//                             </InputAdornment>
//                         ),
//                     }}
//                     onChange={(e) => {
//                         var value = parseInt(e.target.value, 10);
//
//                         if (value > 9) value = 9;
//                         if (value < 0) value = 0;
//
//                         setPaxQty((prev)=>({...prev, adl: value}));
//                     }}
//                 />
//
//                 {/* <FormControl variant="filled" fullWidth>
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
//
//           </Select>
//
//           <FormHelperText style={{ color: "red" }}></FormHelperText>
//         </FormControl> */}
//             </Grid>
//             <Grid item xs={12} sm={4}>
//                 <FormControl variant="filled" fullWidth>
//                     <InputLabel id="adl-label">Children</InputLabel>
//                     <Select
//                         labelId="adl-label"
//                         id="pax-qty"
//                         value={origin}
//                         defaultValue={1}
//                         label="Adult"
//                         name="adl"
//                         onChange={handlePaxQty}
//                         required={true}
//                         IconComponent={() => <Person2 sx={{ m: 1.5 }} color="secondary" />}
//                     >
//                         <MenuItem value={""}>None</MenuItem>
//
//                     </Select>
//
//                     <FormHelperText style={{ color: "red" }}></FormHelperText>
//                 </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//                 <FormControl variant="filled" fullWidth>
//                     <InputLabel id="adl-label">Infant</InputLabel>
//                     <Select
//                         labelId="adl-label"
//                         id="pax-qty"
//                         value={origin}
//                         defaultValue={1}
//                         label="Adult"
//                         name="adl"
//                         onChange={handlePaxQty}
//                         required={true}
//                         IconComponent={() => <Person2 sx={{ m: 1.5 }} color="secondary" />}
//                     >
//                         <MenuItem value={""}>None</MenuItem>
//
//                     </Select>
//
//                     <FormHelperText style={{ color: "red" }}></FormHelperText>
//                 </FormControl>
//             </Grid>
//         </Fragment>
//     );
// };
//
// export default PaxQty;
