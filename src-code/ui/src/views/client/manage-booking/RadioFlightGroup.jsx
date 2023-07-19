import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import '@fontsource/public-sans';
import { mb_selectFlight } from 'store/manage-booking/mb.action';
// component
import { List, ListItem, Radio, RadioGroup } from '@mui/joy';
import { Fragment } from 'react';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { Flight } from '@mui/icons-material';
import { AirportLocation } from 'ui-component/icons/SharedIconComponents';
import { useDispatch, useSelector } from 'react-redux';
import { selectManageBookingObj } from 'store/manage-booking/mb.selector';
const materialTheme = materialExtendTheme();
export default function RadioFlightGroup({ flights }) {
  const selectMBObj = useSelector(selectManageBookingObj);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(mb_selectFlight(e.target.value));
  };
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <RadioGroup aria-label="Your plan" name="flightId" onChange={handleChange}>
          <List
            sx={{
              minWidth: 200,
              '--List-gap': '1.5rem',
              '--ListItem-paddingY': '1.5rem',
              '--ListItem-radius': '8px',
              '--ListItemDecorator-size': '3px'
            }}
          >
            {flights.map((item, index) => (
              <Fragment key={item?.id}>
                <ListItem variant="outlined" key={item?.flightNumber} sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}>
                  <Radio
                    key={index}
                    color="info"
                    overlay
                    value={item?.id}
                    checked={selectMBObj.flightId == item?.id}
                    label={
                      <Grid container spacing={2} sx={{ pr: { md: 2, xs: 0 } }}>
                        <Grid item xs={12}>
                          {index === 0 ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Flight key={item?.id} size="large" sx={{ mr: 1, rotate: '90deg' }} />
                              Departure
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Flight key={item?.id} size="large" sx={{ mr: 1, rotate: '-90deg' }} />
                              Return
                            </Box>
                          )}
                          <Divider variant="middle" sx={{ p: 1 }} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          Flight: <b>FS{item?.flightNumber}</b>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <small>
                            <b>STD: </b>
                            {item?.std.split('T' || ' ')[1]}
                          </small>{' '}
                          <small>{item?.std.split('T' || ' ')[0]}</small>
                        </Grid>
                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography sx={{ fontWeight: 'bold', mr: 'auto' }}>{item?.origin.iata_code}</Typography>
                          <AirportLocation sx={{ mx: { md: 2, xs: 0 } }} />
                          <Paper elevation={1} sx={{ maxHeight: '2px', mt: 1, flexGrow: 1 }}></Paper>
                          <AirportLocation sx={{ mx: { md: 2, xs: 0 } }} />
                          <Typography sx={{ fontWeight: 'bold', ml: 'auto' }}>{item?.destination.iata_code}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { md: 'start', xs: 'space-between' } }}>
                          <small>{item?.origin.name}</small>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { md: 'end', xs: 'space-between' } }}>
                          <small>{item?.destination.name}</small>
                        </Grid>
                      </Grid>
                    }
                    sx={{ zIndex: 5, flexGrow: 1, flexDirection: 'row-reverse' }}
                    slotProps={{
                      action: ({ checked }) => ({
                        sx: () => ({
                          ...(checked && {
                            inset: -1,
                            border: '2px solid',
                            borderColor: '#6200EE'
                          })
                        })
                      })
                    }}
                  />
                </ListItem>
              </Fragment>
            ))}
          </List>
        </RadioGroup>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
