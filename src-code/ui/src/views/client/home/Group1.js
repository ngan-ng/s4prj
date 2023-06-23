import React from 'react';
import SearchFlightForm from 'ui-component/client/SearchFlightForm';
import HomeCarousel from 'ui-component/client/HomeCarousel';
import SwipeableViews from 'react-swipeable-views';
import { ShareLocationTwoTone } from '@mui/icons-material';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import SearchBookingForm from 'ui-component/client/SearchBookingForm';
import TracingFlight from 'ui-component/client/TracingFlight/TracingFlight';
import { BookingHomeIcon, ManageBookingIcon } from 'ui-component/icons/SharedIconComponents';
const Group1 = () => {
  const backgroundOpacity = 'rgba(255,255,255,0.6)';
  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function HomeTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
      <Typography variant="body1" component="div" sx={{ position: 'relative', mx: 0, px: 0, width: '100%', height: 800 }}>
        <Box sx={{ position: 'absolute', zIndex: '99', top: 0, mx: 0, px: 0, width: '100%' }}>
          <HomeCarousel />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            zIndex: '100',
            top: 30,
            left: 0,
            right: 0,
            m: '0 auto',
            p: 1,
            width: '60%'
          }}
        >
          <Paper
            square
            style={{
              backgroundColor: backgroundOpacity
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              aria-label="home tabs"
              variant="fullWidth"
            >
              <Tab sx={{ px: 0 }} label="Booking" icon={<BookingHomeIcon sx={{ fontSize: 29 }} />} />
              <Tab sx={{ px: 0 }} label="Manage Booking" icon={<ManageBookingIcon fontSize="large" />} />
              <Tab sx={{ mx: 0 }} label="Tracing Flights" icon={<ShareLocationTwoTone fontSize="large" />} />
            </Tabs>
          </Paper>
          <SwipeableViews axis={'x'} index={value} onChangeIndex={handleChangeIndex}>
            <HomeTabPanel value={value} index={0}>
              <SearchFlightForm backgroundOpacity={backgroundOpacity} />
            </HomeTabPanel>
            <HomeTabPanel value={value} index={1}>
              <SearchBookingForm backgroundOpacity={backgroundOpacity} />
            </HomeTabPanel>
            <HomeTabPanel value={value} index={2}>
              <TracingFlight backgroundOpacity={backgroundOpacity} />
            </HomeTabPanel>
          </SwipeableViews>
        </Box>
      </Typography>
    </>
  );
};
export default Group1;
