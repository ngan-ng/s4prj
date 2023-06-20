import { Container } from '@mui/material';
import Group1 from './Group1';
import News from './News';

const HomePage = () => {
  return (
    <Container maxWidth={false} disableGutters>
      {/* Group 1: Banner and Search Flight Form */}
      <Group1 />

      {/* Group 2: News */}
      <News />
    </Container>
  );
};
export default HomePage;
