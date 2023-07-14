/* eslint-disable no-unused-vars */
import { Grid, Typography, Link } from '@mui/material';
import { Fragment } from 'react';
import facebook from '../../../../assets/images/icons/facebook.svg';
import twitter from '../../../../assets/images/icons/twitter.svg';
import instagram from '../../../../assets/images/icons/instagram.svg';

const Footer = () => {
  return (
    <Fragment>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" sx={{ pt: 3 }} spacing={3}>
        <Grid item xs={6} md={3}>
          <Typography variant="h4" sx={{ color: '#2bd3bc' }}>
            Information
          </Typography>
          <Typography> 590 CMT8, Ward 11, District 3, Ho Chi Minh City</Typography>
          <Typography>Hotline: 123-456-789</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h4" sx={{ color: '#2bd3bc' }}>
            {' '}
            FS Airlines{' '}
          </Typography>
          <Link component="button" onClick={() => navigate('/')} underline="hover" color="inherit" sx={{}}>
            Home
          </Link>
        </Grid>
        <Grid item xs={6} md={3} container direction="column" justifyContent="space-evenly" alignItems="flex-start">
          <Grid item>
            <Typography variant="h4" sx={{ color: '#2bd3bc' }}>
              Support{' '}
            </Typography>
          </Grid>
          <Grid item>
            <Link component="button" onClick={() => navigate('/')} underline="hover" color="inherit" sx={{}}>
              Contact us
            </Link>
          </Grid>
          <Grid item>
            <Link component="button" onClick={() => navigate('/')} underline="hover" color="inherit" sx={{}}>
              FAQs
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={6} md={3} container spacing={2}>
          <Grid item>
            <img alt="facebook logo" src={facebook} height={30} />
          </Grid>
          <Grid item>
            <img alt="twitter logo" src={twitter} height={30} />
          </Grid>
          <Grid item>
            <img alt="instagram logo" src={instagram} height={30} />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Footer;
