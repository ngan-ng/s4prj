import { Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Fragment } from "react";

const TripDate = ({ searchDto, onChange, validation }) => {
  const today = dayjs();
  let isOneWay = searchDto.tripType === "oneway";
  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex" }}
          components={["DatePicker", "DatePicker"]}
        >
          <Grid item sm={6} xs={12}>
            <DatePicker
              value={searchDto.departDate}
              onChange={(value) => {
                onChange(value, "departDate");
              }}
              minDate={today}
              maxDate={today.add(6, "month")}
              slotProps={{
                textField: { helperText: validation.errors.departDate },
              }}
              label="Departure date"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <DatePicker
              disabled={isOneWay}
              value={isOneWay ? null : searchDto.returnDate}
              defaultValue={searchDto.departDate}
              onChange={(value) => {
                onChange(value, "returnDate");
              }}
              minDate={searchDto.departDate}
              maxDate={today.add(6, "month")}
              slotProps={{
                textField: { helperText: validation.errors.returnDate },
              }}
              label="Return date"
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Fragment>
  );
};

export default TripDate;
