import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAirports } from "../../../store/airport/airport.selector";
import { fetchAirportStart } from "../../../store/airport/airport.action";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FlightLand, FlightTakeoff, Search } from "@mui/icons-material";

export const Airports = ({
  origin,
  destination,
  airportChange,
  handleSubmit
}) => {
  const dispatch = useDispatch();
  const airports = useSelector(selectAirports);
  useEffect(() => {
    dispatch(fetchAirportStart());
  }, [dispatch]);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="airport-select-origin-label">Origin</InputLabel>
            <Select
              labelId="airport-select-origin-label"
              id="airport-select-origin"
              value={origin}
              label="Origin"
              name="origin"
              onChange={airportChange}
              IconComponent={() => (
                <FlightTakeoff sx={{ m: 1.5 }} color="secondary" />
              )}
            >
              <MenuItem key={0} value={""}>
                None
              </MenuItem>
              {airports.data ? (
                airports.data
                  .filter((item) => item.iata_code !== destination)
                  .map((item) => (
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
        </Grid>
        <Grid item sm={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="airport-select-destination-label">
              Destination
            </InputLabel>
            <Select
              labelId="airport-select-destination-label"
              id="airport-select-destination"
              value={destination}
              label="Destination"
              name="destination"
              onChange={airportChange}
              IconComponent={() => (
                <FlightLand sx={{ m: 1.5 }} color="secondary" />
              )}
            >
              <MenuItem key={0} value={""}>
                None
              </MenuItem>
              {airports ? (
                airports.data
                  .filter((item) => item.iata_code !== origin)
                  ?.map((item) => (
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
        </Grid>
        <Grid item sm={4} xs={6} textAlign={"end"} sx={{ p: 0 }}>
          <Button
            color="secondary"
            sx={{ height: "100%", width: "80%" }}
            variant="contained"
            size="large"
            onClick={handleSubmit}
            endIcon={<Search />}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};
