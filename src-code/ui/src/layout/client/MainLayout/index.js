import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Toolbar>
        <Header />
      </Toolbar>
    </Box>
  );
};

export default MainLayout;
