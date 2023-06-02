import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Grid } from "@mui/material";

export default function DateForTrip({ searchDto, setSearchDto }) {
  const today = dayjs();
  const yesterday = today.add(-1, "day");
  const sixMonthLater = today.add(6, "month");

  let obj = {
    departDate: today,
    returnDate: today,
    tripType: searchDto.tripType,
  };

  const validDepart = (val) => {
    // console.log((val))
    val.isBefore(yesterday) || val.isAfter(sixMonthLater);
  };

  const validReturn = (val) =>
    val.isBefore(obj.departDate.add(-1, 'day')) || val.isAfter(sixMonthLater);

  const changeDate = (timestamp, type) => {
    const date = dayjs(timestamp);
    if (type === "depart") {
      obj.departDate = date;

      // console.log(obj.returnDate);
    } else {
      obj.returnDate = date;
    }
    if(obj.departDate.isAfter(obj.returnDate)){
      obj.returnDate = '';
      alert('invalid return day');
    }
    console.log(type);
    console.log(obj.departDate.format('YYYY-MM-DD'));
    // console.log(obj.returnDate?.format('YYYY-MM-DD'));
    // setSearchDto((prev) => ({
    //   ...prev,
    //   departDate: dayjs(timestamp).format("YYYY-MM-DD"),
    // }));
  };
  // const changeReturnDate = (timestamp) => {
  //   // setSearchDto((prev) => ({
  //   //   ...prev,
  //   //   returnDate: dayjs(timestamp).format("YYYY-MM-DD"),
  //   // }));
  // };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <MobileDatePicker
            label="Depart date"
            minDate={today}
            maxDate={sixMonthLater}
            value={obj.departDate && today}
            onChange={(value) => changeDate(value, "depart")}
            sx={{ width: "100%" }}
            shouldDisableDate={validDepart}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <MobileDatePicker
            label="Return date"
            sx={{ width: "100%" }}
            value={obj.returnDate}

            onChange={(value) => changeDate(value, "return")}
            shouldDisableMonth={validReturn}
            disableOpenPicker={searchDto.tripType === "one-way"}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
