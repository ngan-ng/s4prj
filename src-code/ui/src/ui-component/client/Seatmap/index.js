/* eslint-disable no-unused-vars */
import { Box, Grid, Typography } from '@mui/material';
import Seat from './Seat';
import React from 'react';
import cockpit from 'assets/images/cockpit.jpg';

const Seatmap = ({ seats, onHandleSeat }) => {
  let rows = [];
  let singleRow = [];
  let block = [];
  seats.map((s, index) => {
    if ((index + 1) % 3 !== 0) {
      block.push(s);
    } else {
      block.push(s);
      singleRow.push(block);
      if (singleRow.length % 2 == 0) {
        rows.push(singleRow);
        singleRow = [];
      }
      block = [];
    }
  });
  console.log('REREDNER');
  return (
    <Box
      xs={12}
      sx={{
        mr: 2,
        p: 4,
        width: '100%',
        minWidth: 330,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        overflow: 'scroll',
        height: '600px',
        position: 'relative'
      }}
    >
      {/* /// COCKPIT DECORATION /// */}
      <Grid container direction="row" sx={{ pl: { sm: 3, xs: 1 }, ml: 1, mb: 3 }}>
        <Grid item xs={12}>
          <img src={cockpit} alt="cockpit" height={128} width="100%" />
        </Grid>
      </Grid>
      {/* /// END COCKPIT DECORATION /// */}
      {/* /// ROW LABEL DECORATION /// */}
      <Grid container direction="row" sx={{ pr: 1 }} spacing={1}>
        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', mx: 0, pr: 0 }}>
          <Typography color="grey" fontWeight="bold" fontSize={10}></Typography>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {['A', 'B', 'C'].map((rowNumber) => (
              <Typography color="gray" fontSize={20} key={rowNumber}>
                {rowNumber}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {['D', 'E', 'F'].map((rowNumber) => (
              <Typography color="gray" fontSize={18} key={rowNumber}>
                {rowNumber}
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>
      {rows.map((singleRow, index) => (
        <Grid container key={index} sx={{ pr: 1 }} spacing={1}>
          {/* /// WINGS DECORATION /// */}
          <Grid item xs={1} sx={{ pr: { xs: 0, md: 2 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {index === 11 && (
              <>
                <Box
                  sx={{
                    transform: 'skewY(-45deg)',
                    left: 0,
                    zIndex: 0,
                    position: 'absolute',
                    bgcolor: 'rgba(254,192,203,0.8)',
                    width: 25,
                    height: 200
                  }}
                ></Box>
                <Box
                  sx={{
                    transform: 'skewY(45deg)',
                    right: 0,
                    zIndex: 0,
                    position: 'absolute',
                    bgcolor: 'rgba(254,192,203,0.8)',
                    width: 25,
                    height: 200
                  }}
                ></Box>
              </>
            )}
            <Typography sx={{ zIndex: 1 }} color="gray" fontSize={{ md: 20, xs: 15 }}>
              {index + 1}
            </Typography>
          </Grid>
          {/* /// SEATS ON THE AISLE'S LEFT-HAND SIDE /// */}
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {singleRow[0].map((seat, i) => (
                <Seat s={seat} onClickEvent={onHandleSeat} key={i} />
              ))}
            </Box>
          </Grid>
          {/* /// THE AISLE /// */}
          <Grid item xs={1} sx={{ minWidth: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            | |
          </Grid>
          {/* /// SEATS ON THE AISLE'S RIGHT-HAND SIDE /// */}
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {singleRow[1].map((seat, i) => (
                <Seat s={seat} onClickEvent={onHandleSeat} key={i} />
              ))}
            </Box>
          </Grid>
        </Grid>
      ))}
      <Grid container></Grid>
    </Box>
  );
};

export default Seatmap;
