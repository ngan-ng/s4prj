import {
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { Fragment } from "react";
import DateForTrip from "./DateForTrip";
import { Airports } from "./Airports";
import dayjs from "dayjs";

const SearchFlightForm = () => {
  const initialSearchDto = {
    origin: "",
    destination: "",
    departDate: '',
    returnDate: '',
    tripType:'roundtrip'
  };
  const [searchDto, setSearchDto] = React.useState(initialSearchDto);

  const handleChange = (e) => {
    let fieldName = e.target.name;
    console.log(fieldName);
    setSearchDto((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };
  const handleSearch = () => {
    console.log(searchDto);
  };
  return (
    <Fragment>
      <Paper elevation={5} sx={{ opacity: 0.96, p: 3 }}>
        <Grid container xs={12} md={12} direction={"column"}>
          {/* Row 1: */}
          <Airports
            origin={searchDto.origin}
            destination={searchDto.destination}
            airportChange={handleChange}
            handleSubmit={handleSearch}
          />
          {/* Row 2: */}
          <Grid item xs={12} pt={2}>
            {/* <FormLabel id="ticket-type-label">Gender</FormLabel> */}
            {/* <FormControl> */}
            <RadioGroup
              row
              aria-labelledby="ticket-type-label"
              name="tripType"
              defaultValue="roundtrip"
              onChange={handleChange}
            >
              <FormControlLabel
                value="roundtrip"
                control={<Radio color="secondary" />}
                label="Round-trip"
                labelPlacement="top"
              />
              <FormControlLabel
                value="oneway"
                control={<Radio color="secondary" />}
                label="One-way"
                labelPlacement="top"
              />
            </RadioGroup>
            {/* </FormControl> */}
          </Grid>
          {/* Row 3: */}
          <Grid item xs={12} pt={2}>
            <DateForTrip
              searchDto={searchDto}
              setSearchDto={setSearchDto}
              // returnDate={searchDto}
              // departDateChange={handleChange}
              // returnDateChange={handleChange}
            />
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default SearchFlightForm;
