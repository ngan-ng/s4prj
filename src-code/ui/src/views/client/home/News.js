/* eslint-disable no-unused-vars */
import { Fragment } from 'react';
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import news1 from '../../../assets/images/news/news1.png';
import news2 from '../../../assets/images/news/news2.png';
import news3 from '../../../assets/images/news/news3.png';
import news4 from '../../../assets/images/news/news4.png';
import { width } from '@mui/system';

const News = () => {
  const textPosition = {};

  const container = {
    //boxShadow: '1px 2px 9px #673ab7',
    position: 'relative',
    textAlign: 'center',
    color: '#673ab7',
    width: '70%'
  };

  const text = {
    color: 'white',
    backgroundColor: 'rgba(209, 209, 209, 0.24)',
    position: 'absolute',
    top: '8px',
    left: '16px'
  };

  return (
    <Fragment>
      <Grid direction="row" container alignItems="center" justifyContent="center" sx={{ pb: 2 }}>
        <Grid item xs={12} md={6} container justifyContent="center" sx={{ pb: 2 }}>
          <Card style={container}>
            <CardActionArea component={Link} to="/">
              <Typography style={text} variant="h3" gutterBottom>
                NEW FLIGHT ROUTES FROM HA NOI - DA LAT/ CAM RANH
              </Typography>
              <CardMedia component="img" style={{ width: '100%' }} image={news1} alt="green iguana" />
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} container justifyContent="center" sx={{ pb: 2 }}>
          <Card style={container}>
            <CardActionArea component={Link} to="/">
              <Typography style={text} variant="h3" gutterBottom>
                NEW FLIGHT ROUTES FROM HANOI - MACAU
              </Typography>
              <CardMedia component="img" style={{ width: '100%' }} image={news2} alt="green iguana" />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Grid direction="row" container alignItems="center" justifyContent="center" sx={{ pb: 2 }}>
        <Grid item xs={12} md={6} container justifyContent="center" sx={{ pb: 2 }}>
          <Card style={container}>
            <CardActionArea component={Link} to="/">
              <Typography style={text} variant="h3" gutterBottom>
                THE FIRST CHARTER FLIGHT QUY NHON - CAM RANH
              </Typography>
              <CardMedia component="img" style={{ width: '100%' }} image={news3} alt="green iguana" />
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} container justifyContent="center" sx={{ pb: 2 }}>
          <Card style={container}>
            <CardActionArea component={Link} to="/">
              <Typography style={text} variant="h3" gutterBottom>
                FS AIRLINES SIGN AGREEMENT
              </Typography>
              <CardMedia component="img" style={{ width: '100%' }} image={news4} alt="green iguana" />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default News;
