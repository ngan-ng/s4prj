/* eslint-disable react/prop-types */
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAirports } from '../../../store/airport/airport.selector';
import { fetchAirportStart } from '../../../store/airport/airport.action';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { FlightLand, FlightTakeoff } from '@mui/icons-material';

const Airports = ({ origin, destination, airportChange, onHasError, validation }) => {
  const dispatch = useDispatch();
  const airports = useSelector(selectAirports);
  useEffect(() => {
    dispatch(fetchAirportStart());
  }, [dispatch]);

  return (
    <Fragment>
      <Grid container direction={'row'} spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="airport-select-origin-label">Origin</InputLabel>
            <Select
              labelId="airport-select-origin-label"
              id="airport-select-origin"
              value={origin}
              label="Origin"
              name="origin"
              onChange={airportChange}
              required={true}
              error={onHasError('origin')}
              IconComponent={() => <FlightTakeoff sx={{ m: 1.5 }} color="secondary" />}
            >
              <MenuItem value={''}>None</MenuItem>
              {airports?.data ? (
                airports?.data
                  //   .filter((item) => item.iata_code !== destination)
                  .map((item) => (
                    <MenuItem key={item.iata_code} value={`${item.iata_code}`}>
                      {item.location} - {item.name} ({item.iata_code})
                    </MenuItem>
                  ))
              ) : (
                <MenuItem>
                  <em>Airport unavailable now</em>
                </MenuItem>
              )}
            </Select>
            {onHasError('origin') && <FormHelperText style={{ color: 'red' }}>{validation.errors.origin}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="airport-select-destination-label">Destination</InputLabel>
            <Select
              labelId="airport-select-destination-label"
              id="airport-select-destination"
              value={destination}
              label="Destination"
              name="destination"
              onChange={airportChange}
              error={onHasError('destination') ? true : false}
              IconComponent={() => <FlightLand sx={{ m: 1.5 }} color="secondary" />}
            >
              <MenuItem key={0} value={''}>
                None
              </MenuItem>
              {airports != null ? (
                airports.data
                  //   .filter((item) => item.iata_code !== origin)
                  ?.map((item) => (
                    <MenuItem key={item.iata_code} value={`${item.iata_code}`}>
                      {item.location} - {item.name} ({item.iata_code})
                    </MenuItem>
                  ))
              ) : (
                <MenuItem>
                  <em>Airport unavailable now</em>
                </MenuItem>
              )}
            </Select>
            {onHasError('destination') && <FormHelperText style={{ color: 'red' }}>{validation.errors.destination}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default Airports;
