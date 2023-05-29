import {
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAirportStart } from "../../store/airport/airport.action";
import { selectAirports } from "../../store/airport/airport.selector";
import DateForTrip from "./DateForTrip";

const SearchFlightForm = () => {
  const dispatch = useDispatch();
  const airports = useSelector(selectAirports);
  useEffect(() => {
    if(!airports.airports){
      console.log("AIRPORT EMPTY");
      dispatch(fetchAirportStart());
    }

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
    <>
     <RadioGroup sx={{display: 'block'}}>
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

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="airport-select-label">Origin</InputLabel>
        <Select
          labelId="airport-select-label"
          id="airport-select"
          value={origin}
          label="Origin"
          // onChange={handleChangeOrigin}
        >
          {airports.data ? (
            airports.data.map((item) => (
              <MenuItem key={item.iata_code} value={`${item.iata_code}`}>
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
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="airport-select-label">Destination</InputLabel>
        <Select
          labelId="airport-select-label"
          id="airport-select"
          value={dest}
          label="Destination"
          // onChange={handleChangeOrigin}
        >
          {airports.data ? (
            airports.data.map((item) => (
              <MenuItem key={item.iata_code} value={`${item.iata_code}`}>
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
      <DateForTrip />
    </>
  );
};

export default SearchFlightForm;
