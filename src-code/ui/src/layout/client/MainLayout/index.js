import { AppBar, Avatar, Box, Container, CssBaseline, IconButton, Toolbar } from '@mui/material';
import Header from './Header';
import { Outlet, useNavigate} from 'react-router-dom';
import Footer from './Footer';
import logo from 'assets/images/logo/logo.png';

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <Box minHeight="100vh">
      <CssBaseline />
      {/* Header */}
      <AppBar
        color="secondary"
        position="static"
        elevation={3}
        sx={{ zIndex: 500, opacity: 0.93, display: 'block', px: 1 }}
      >
        <Toolbar>
          <IconButton onClick={() => navigate('/')} edge="start" color="inherit" sx={{ ml: 0, p: 0, my: 0, mr: 2 }}>
            <Avatar
              variant="square"
              src={logo}
              sizes="large"
              sx={{ height: '60px', width: '60px', backgroundColor: 'transparent' }}
            />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      {/* Main body */}
      <Outlet />
      {/* Footer */}
      <AppBar
        color="secondary"
        position="static"
        elevation={3}
        sx={{ display: 'block', opacity: 0.93, top: 'auto', bottom: 0, mt: 3 }}
      >
        <Container>
          <Toolbar>
            <Footer />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default MainLayout;
