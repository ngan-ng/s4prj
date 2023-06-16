/* eslint-disable no-unused-vars */
import { AppBar, Avatar, Box, Container, CssBaseline, IconButton, Toolbar } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import logo from 'assets/images/logo/logo.png';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { signIn } from 'azure/authPopup';
import { useDispatch } from 'react-redux';
import { loginRequest } from 'azure/authConfig';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { instance, accounts } = useMsal();
  const [name, setName] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      setName(accounts[0].name);
    } else {
      setName(null);
    }
  }, [accounts]);
  const handleLogout = (logoutType = 'popup') => {
    signOutStart();
    if (logoutType === 'popup') {
      instance
        .logoutPopup()
        .then((res) => signOutSuccess())
        .catch((error) => console.log(error));
    } else if (logoutType === 'redirect') {
      instance
        .logoutRedirect()
        .then((res) => signOutSuccess())
        .catch((error) => console.log(error));
    }
  };
  const handleLogin = (loginType) => {
    // signInStart();
    signIn();
    if (loginType === 'popup') {
      instance
        .loginPopup(loginRequest)
        .then((res) => signInSuccess(res))
        .catch((err) => console.log(err));
    } else if (loginType === 'redirect') {
      instance
        .loginRedirect(loginRequest)
        .then((res) => signInSuccess(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box>
      <CssBaseline />
      {/* Header */}
      <AppBar color="secondary" position="static" elevation={3} sx={{ opacity: 0.93, display: 'block', px: 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ ml: 0, p: 0, my: 0, mr: 2 }}>
            <Avatar variant="square" src={logo} sizes="large" sx={{ height: '60px', width: '60px', backgroundColor: 'transparent' }} />
          </IconButton>
          <Header onLogin={handleLogin} onLogout={handleLogout} name={name} />
        </Toolbar>
      </AppBar>
      {/* Main body */}
      <Outlet />
      {/* Footer */}
      <AppBar color="secondary" position="fixed" elevation={3} sx={{ opacity: 0.93, top: 'auto', bottom: 0, mt: 3 }}>
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
// const mapStateToProps = createStructuredSelector({
//   user: selectCurrentUser
// });

// const mapDispatchToProps = (dispatch) => ({
//   signInStart: () => dispatch(signinStart()),
//   signInSuccess: (user) => dispatch(signinSuccess(user)),
//   signInFail: (error) => dispatch(signinFailure(error)),

//   signOutStart: () => dispatch(signOutStart()),
//   signOutSuccess: () => dispatch(signOutSuccess()),
//   signOutFail: (error) => dispatch(signOutFailure(error)),
// });
export default MainLayout;
