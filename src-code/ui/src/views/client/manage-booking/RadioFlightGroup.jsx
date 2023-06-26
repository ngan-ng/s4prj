import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import '@fontsource/public-sans';
// component
import { List, ListItem, ListItemDecorator, Radio, RadioGroup, Typography } from '@mui/joy';
import { Fragment } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Flight } from '@mui/icons-material';
const materialTheme = materialExtendTheme();

export default function RadioFlightGroup({ flights, selectedFlight, onFlightChange }) {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <RadioGroup aria-label="Your plan" name="flightId" onChange={onFlightChange}>
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
                <ListItem variant="outlined" key={item?.id} sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}>
                  <ListItemDecorator>
                    {
                      [
                        // <DepartFlightIcon style={{ fontSize: 8 }} key={item?.id} />,
                        <Flight key={item?.id} size="large" sx={{ marginX: 1, rotate: '90deg' }} />,
                        <Flight key={item?.id} size="large" sx={{ marginX: 1, rotate: '-90deg' }} />
                      ][index]
                    }
                  </ListItemDecorator>
                  <Radio
                    key={item?.id}
                    color="info"
                    overlay
                    value={item?.id}
                    checked={selectedFlight == item.id}
                    label={
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={index === 0 ? 'Departure' : 'Return'}
                        sx={{ border: 'none', '& fieldset': { border: 'none' } }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Typography sx={{ ml: 'auto' }}>
                                <b>FS{item?.flightNumber}</b>
                                {' - '}
                                <small>{item?.std.split('T' || ' ')[1]}</small>
                              </Typography>
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="start" sx={{ pr: 1 }}>
                              <Typography sx={{ marginX: 2 }}>
                                <b>
                                  {item?.origin.iata_code} - {item?.destination.iata_code}
                                </b>{' '}
                              </Typography>
                              <small>{item?.std.split('T' || ' ')[0]}</small>
                            </InputAdornment>
                          )
                        }}
                        helperText={
                          <Typography>
                            {item?.origin.name} - {item?.destination.name}
                          </Typography>
                        }
                      />
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
