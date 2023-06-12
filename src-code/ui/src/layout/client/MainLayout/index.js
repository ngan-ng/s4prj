import { AppBar, Avatar, Box, Container, CssBaseline, IconButton, Toolbar } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import logo from 'assets/images/logo/logo.png';

const MainLayout = () => {
  return (
    <Box>
      <CssBaseline />
      {/* Header */}
      <AppBar color="secondary" position="static" elevation={3} sx={{ opacity: 0.93, display: 'block', px: 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ ml: 0, p: 0, my: 0, mr: 2 }}>
            <Avatar variant="square" src={logo} sizes="large" sx={{ height: '60px', width: '60px', backgroundColor: 'transparent' }} />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      {/* Main body */}
      <Outlet />
      {/* Footer */}
      <AppBar color="secondary" position="static" elevation={3} sx={{ opacity: 0.93, top: 'auto', bottom: 0, mt: 3 }}>
        <Container>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Avatar src="assets/images/logo-dark.svg" />
            </IconButton>
            <Footer />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default MainLayout;
