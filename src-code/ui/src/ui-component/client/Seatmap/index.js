import { Box, Grid, Typography } from '@mui/material';
import Seat from './Seat';
import React from 'react';

const Seatmap = ({ seats }) => {
  // console.log(seats);
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
  console.log(window);
  return (
    <Box
      xs={12}
      sx={{
        mx: 2,
        p: 3,
        width: '100%',
        minWidth: 299,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        overflow: 'scroll',
        height: '580px',
        position: 'relative',
        pt: 8,
        borderTop: 1,
        borderColor: 'grey.500',
        borderTopLeftRadius: '40%',
        borderTopRightRadius: '40%'
      }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{ ml: { md: 3, xs: 0 }, pl: { md: 1, xs: 0 }, mb: 1, display: 'flex', justifyContent: 'space-around' }}
      >
        <Grid item xs={1}></Grid>
        <Grid xs={5} item sx={{ bgcolor: 'gray', height: 60, borderTopLeftRadius: '120%', borderTopRightRadius: 0 }}></Grid>
        <Grid xs={5} item sx={{ bgcolor: 'gray', height: 60, borderTopRightRadius: '130%', borderTopLeftRadius: 0 }}></Grid>
        <Grid item xs={1}></Grid>
      </Grid>
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
                    width: 20,
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
                    width: 20,
                    height: 200
                  }}
                ></Box>
              </>
            )}
            <Typography sx={{ zIndex: 1 }} color="gray" fontSize={20}>
              {index + 1}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {singleRow[0].map((seat, i) => (
                <Seat key={i} s={seat} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={1} sx={{ minWidth: '10px' }}>
            | |
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {singleRow[1].map((seat, i) => (
                <Seat key={i} s={seat} />
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
