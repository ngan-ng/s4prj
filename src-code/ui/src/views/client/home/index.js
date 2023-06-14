import React from 'react';
import { Container } from '@mui/material';
import SearchFlightForm from 'ui-component/client/SearchFlightForm/SearchFlightForm.jsx';
import HomeCarousel from 'ui-component/client/HomeCarousel';

const HomePage = () => {
  return (
    <Container sx={{ mx: 0, px: 0, width: '100%' }}>
      <HomeCarousel sx={{ mx: 0, px: 0, width: '100%' }} />
      <SearchFlightForm />
      {/*  News */}
    </Container>
  );
};
export default HomePage;
