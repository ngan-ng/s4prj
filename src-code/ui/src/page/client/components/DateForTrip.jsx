import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function DateForTrip() {
  const currentday = new Date().getDate();
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        defaultValue={dayjs(new Date())}
        sx={{ display: "inline", m: 1 }}
      />
      <MobileDatePicker
        defaultValue={dayjs(new Date().setDate(currentday + 1))}
        sx={{ display: "inline", m: 1 }}
      />
    </LocalizationProvider>
  ); 
}
