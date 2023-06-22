import { Button, Card, Stack, Typography } from '@mui/material';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutStart, signinStart } from 'store/user/user.action';
import { selectCurrentUser } from 'store/user/user.selector';

const Header = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOutStart());
  };
  const handleLogin = () => {
    try {
      dispatch(signinStart());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    location.href;
  }, [user]);

  return (
    <Fragment>
      <Typography>Header here</Typography>
      <Stack spacing={2} sx={{ ml: 'auto' }} direction={'row'}>
        <Card>Item 1</Card>
        <Card>Item 1</Card>
        {user ? (
          <>
            <Card>Hello {user.givenName}</Card>
            <Card>
              <Button onClick={handleLogout}>Sign Out</Button>
            </Card>
          </>
        ) : (
          <Card>
            <Button onClick={handleLogin}>Sign In</Button>
          </Card>
        )}
      </Stack>
    </Fragment>
  );
};

export default Header;
