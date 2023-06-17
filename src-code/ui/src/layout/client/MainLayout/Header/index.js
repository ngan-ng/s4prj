import { Button, Card, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';

// eslint-disable-next-line react/prop-types
const Header = ({ onLogin, onLogout, email }) => {
  return (
    <Fragment>
      <Typography>Header here</Typography>
      <Stack spacing={2} sx={{ ml: 'auto' }} direction={'row'}>
        <Card>Item 1</Card>
        <Card>Item 1</Card>
        <Card>
          {email ? <Button onClick={() => onLogout('popup')}>Logout</Button> : <Button onClick={() => onLogin('popup')}>Login</Button>}
        </Card>
      </Stack>
    </Fragment>
  );
};

export default Header;
