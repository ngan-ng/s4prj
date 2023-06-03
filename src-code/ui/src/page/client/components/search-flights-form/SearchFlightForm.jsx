import {
<<<<<<< HEAD
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
=======
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import {FlightLand, FlightTakeoff} from '@mui/icons-material/';
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAirportStart } from "../../../../store/airport/airport.action";
import { selectAirports } from "../../../../store/airport/airport.selector";
import DateForTrip from "../DateForTrip";

const SearchFlightForm = () => {
  const dispatch = useDispatch();
  const airports = useSelector(selectAirports);
  useEffect(() => {
    dispatch(fetchAirportStart());
  }, [dispatch]);

  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");

  const [bookingType, setBookingType] = useState("round");
  const selectType = React.useMemo(
    () => (bookingType === "oneway" ? "date" : "range"),
    [bookingType]
  );
  const [startDate, setStartDate] = useState(new Date());
  const bookingTypeChange = (ev) => {
    setBookingType(ev.target.value);
  };
  return (
    <Fragment>
      <Paper elevation={5} sx={{ opacity: 0.96, p: 2 }}>
        <Grid container xs={12} md={12} direction={"column"}>
          {/* Row 1: */}
          <Grid container>
            <Grid item sm={4} xs={12} sx={{ p: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="airport-select-label">Origin</InputLabel>
                <Select
                  labelId="airport-select-label"
                  id="airport-select"
                  value={origin}
                  label="Origin"
                  // onChange={handleChangeOrigin}
                  IconComponent={() => (
                    <FlightTakeoff sx={{m:1}} color="secondary"/>
                  )}
                >
                  {airports.data ? (
                    airports.data.map((item) => (
                      <MenuItem
                        key={item.iata_code}
                        value={`${item.iata_code}`}
                      >
                        {item.location} - {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>
                      <em>Airport unavailable now</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={4} xs={12} sx={{ p: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="airport-select-label">Destination</InputLabel>
                <Select
                  labelId="airport-select-label"
                  id="airport-select"
                  value={dest}
                  label="Destination"
                  // onChange={handleChangeOrigin}
                  IconComponent={() => (
                    <FlightLand sx={{m:1}} color="secondary"/>
                  )}
                >
                  {airports.data ? (
                    airports.data.map((item) => (
                      <MenuItem
                        key={item.iata_code}
                        value={`${item.iata_code}`}
                      >
                        {item.location} - {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>
                      <em>Airport unavailable now</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/* Row 2: */}
          <Grid container></Grid>
        </Grid>
        <RadioGroup sx={{ display: "block" }}>
          <Radio
            value="round"
            checked={bookingType === "round"}
            onChange={bookingTypeChange}
            label="Round trip"
          />
          <Radio
            value="oneway"
            checked={bookingType === "oneway"}
            onChange={bookingTypeChange}
            label="One way"
          />
        </RadioGroup>

        <DateForTrip />
>>>>>>> NganBranch
      </Paper>
    </Fragment>
  );
};

export default SearchFlightForm;
