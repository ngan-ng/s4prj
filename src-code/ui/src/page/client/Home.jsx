import { Container } from "@mui/material";
import React from "react";
import SearchFlightForm from "./components/search-flights-form/SearchFlightForm";

const Home = () => {
  return (
    <Container>
      <SearchFlightForm />
    </Container>
  );
};

export default Home;
