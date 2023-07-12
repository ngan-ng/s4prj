import { Button, Card, Divider, Link, Stack, Typography } from '@mui/material';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { signOutStart, signinStart } from 'store/user/user.action';
import { selectCurrentUser } from 'store/user/user.selector';

const Header = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <Stack spacing={2} sx={{ ml: 'auto', alignItems: 'center' }} direction={'row'}>
        <Link component="button" onClick={() => navigate('/')} underline="hover" color="inherit" sx={{}}>
          Home
        </Link>
        <Link component="button" onClick={() => navigate('/')} underline="hover" color="inherit" sx={{}}>
          News
        </Link>
        <Divider orientation="vertical" color="inherit" variant="middle" flexItem />
        {user ? (
          <>
            <Link component="button" onClick={() => navigate('/')} underline="hover" color="whitesmoke" sx={{}}>
              {user.givenName}
            </Link>
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
