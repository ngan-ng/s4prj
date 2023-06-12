import { AppBar, Box, Container, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Box>
      <CssBaseline />
      <AppBar position="static" elevation={5} sx={{ display: 'block', py: 2 }}>
        <Container>
          <Toolbar>
            <Header />
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
