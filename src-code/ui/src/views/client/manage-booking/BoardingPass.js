import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { Fragment, useRef } from 'react';
import QRCode from 'react-qr-code';
import ReactToPrint from 'react-to-print';

const BoardingPass = ({ boardingPasses }) => {
  const boardingPassRef = useRef(boardingPasses.map((b, index) => index));

  return (
    <Fragment>
      {boardingPasses && (
        <Box sx={{ minWidth: 680, flexDirection: 'column', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          {boardingPasses.map((bp, index) => (
            <Box key={index}>
              <Paper sx={{ width: 760, display: 'block' }} ref={(el) => (boardingPassRef[index] = el)} elevation={5}>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  textAlign={'center'}
                  color={'white'}
                  sx={{ mx: 0, my: 3, p: 1, backgroundColor: '#724aba', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                >
                  *** Boarding Pass ***
                </Typography>
                <Grid container sx={{ pl: 2 }} spacing={3}>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                      <Typography>
                        <b style={{ fontSize: 18 }}>{bp.date}</b>
                      </Typography>
                      <Typography>
                        Flt: <b style={{ fontSize: 18 }}>FS{bp.flightNumber}</b>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                      <Typography>Fullname:</Typography>
                      <Typography noWrap>
                        <b style={{ fontSize: 18 }}>{bp.fullName}</b>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                      <Typography>Depart:</Typography>
                      <Typography noWrap>
                        <b style={{ fontSize: 18 }}>
                          {bp.origin.location} - {bp.origin.iata_code}
                        </b>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                      <Typography>Arrive:</Typography>
                      <Typography noWrap>
                        <b style={{ fontSize: 18 }}>
                          {bp.destination.location} - {bp.destination.iata_code}
                        </b>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                      <Typography>Bag Tags:</Typography>
                      <Typography noWrap>
                        Seq. <b style={{ fontSize: 18 }}>{bp.seq}</b>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Typography>SSRs:</Typography>
                      <Typography noWrap>
                        <b style={{ fontSize: 18 }}>...</b>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2, px: 5 }}>
                      <Typography>
                        Seat: <b style={{ fontSize: 18 }}>{bp.seatNumber}</b>
                      </Typography>
                      <Typography>
                        Gate: <b style={{ fontSize: 18 }}>{bp.gate}</b>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2, px: 5 }}>
                      <Typography>PNR:</Typography>
                      <Typography>
                        <b style={{ fontSize: 18 }}>{bp.pnr}</b>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2, px: 5 }}>
                      <QRCode level="L" style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={JSON.stringify(bp)} />
                    </Box>
                  </Grid>
                  {/* //////////////// DIVIDER ////////////////// */}
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                      <Typography>
                        <b style={{ fontSize: 16 }}>{bp.date}</b>
                      </Typography>
                      <Typography>
                        Flt: <b style={{ fontSize: 16 }}>FS{bp.flightNumber}</b>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                      <Typography noWrap>
                        <b style={{ fontSize: 16 }}>{bp.fullName}</b>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                      <Typography>
                        Seat: <b style={{ fontSize: 18 }}>{bp.seatNumber}</b>
                      </Typography>
                    </Box>
                    <Typography>Depart:</Typography>
                    <Typography noWrap>
                      <b style={{ fontSize: 16 }}>
                        {bp.origin.location} - {bp.origin.iata_code}
                      </b>
                    </Typography>
                    <Typography>Arrive:</Typography>
                    <Typography noWrap>
                      <b style={{ fontSize: 16 }}>
                        {bp.destination.location} - {bp.destination.iata_code}
                      </b>
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textAlign={'center'}
                  color={'white'}
                  sx={{ mx: 0, my: 1, p: 1, backgroundColor: '#724aba', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                >
                  Now Everyone Can Fly
                </Typography>
              </Paper>
              <ReactToPrint trigger={() => <Button>Save boarding pass</Button>} content={() => boardingPassRef[index]} />
            </Box>
          ))}
        </Box>
      )}
    </Fragment>
  );
};

export default BoardingPass;
