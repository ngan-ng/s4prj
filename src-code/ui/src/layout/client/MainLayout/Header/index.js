/* eslint-disable no-unused-vars */
import { Button, Card, Divider, Link, Stack, Typography } from '@mui/material';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { signOutStart, signinStart } from 'store/user/user.action';
import { selectCurrentUser } from 'store/user/user.selector';

const Header = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate;
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

  const button = {
    backgroundColor: '#2bd3bc',
    borderRadius: '10px',
    marginLeft: '15px',
    marginRight: '15px',
    height: '35px'
  };

  return (
    <Fragment>
      <Typography sx={{ fontFamily: 'Pacifico', fontSize: 20 }}>FS Airlines</Typography>
      <Stack spacing={2} sx={{ ml: 'auto', alignItems: 'center' }} direction={'row'}>
        <Link component="button" onClick={() => navigate('/')} underline="hover" color="inherit" sx={{}}>
          Home
        </Link>
        {/* <Link component="button" onClick={() => navigate('/')} underline="hover" color="inherit" sx={{}}>
          News
        </Link> */}
        <Divider orientation="vertical" color="inherit" variant="middle" flexItem />
        {user ? (
          <>
            {/* <Link component="button" onClick={() => navigate('/')} underline="hover" color="whitesmoke" sx={{}}>
                {user.givenName}
            </Link> */}
            <Typography sx={{ fontFamily: 'Pacifico', color: 'white', textShadow: '0px 0px 3px #673ab7' }}>
              Hi, {user.givenName}
            </Typography>

            <Button style={button} onClick={handleLogout}>
              <Typography sx={{ fontFamily: 'Pacifico', color: 'white', textShadow: '0px 0px 3px #673ab7' }}>
                Sign Out
              </Typography>
            </Button>
          </>
        ) : (
          <Button style={button} onClick={handleLogin}>
            <Typography sx={{ fontFamily: 'Pacifico', color: 'white', textShadow: '0px 0px 3px #673ab7' }}>
              Sign In
            </Typography>
          </Button>
        )}
      </Stack>
    </Fragment>
  );
};

export default Header;
