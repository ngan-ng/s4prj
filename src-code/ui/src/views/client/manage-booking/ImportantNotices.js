import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Typography
} from '@mui/material';
import React from 'react';

const ImportantNotices = ({ isAgree, onAgree }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  let dgr = [];
  for (let i = 1; i < 22; i++) {
    dgr.push({ src: `../../../assets/images/dgr/dgr${i}.png`, alt: `dgr${i}` });
  }
  return (
    <Paper elevation={3} sx={{ p: 3, m: 3 }}>
      <Typography variant="h2" fontWeight="bold" fontSize={28} textAlign={'center'}>
        CONDITION OF CARRIAGE
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            ARTICLE 1. DEFINITIONS AND INTERPRETATION
          </Typography>
          <Typography color="text.secondary">Article 1: Definitions and Interpretation</Typography>
          <Typography color="text.secondary">
            1.1 In these Conditions, these particular terms and expressions have the following meanings (the terms and expressions are
            arranged in alphabetical order):
          </Typography>
          <Link textAlign={'left'} component="button" variant="body2" color="inherit" underline="hover" onClick={handleClickOpen}>
            Tariff means our fares and charges published electronically or on paper and conditions applicable thereto. Carrier’s Regulations
            means rules, other than these Conditions of Carriage, published by us and being in effect from time to time governing carriage
            of Passenger and/or Baggage and available at our offices, check-in counters and on our Website.
          </Link>
        </CardContent>
      </Card>
      <Typography sx={{ mb: 2 }} variant="h2" fontWeight="bold" fontSize={28} textAlign={'center'}>
        FORBIDDEN DANGEROUS GOODS
      </Typography>
      <Grid container spacing={2} textAlign={'center'}>
        {dgr.map((pic, index) => (
          <Grid key={index} item xs={4} md={2}>
            <img width={80} src={pic.src} alt={pic.alt} />
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ my: 2 }} variant="h2" fontWeight="bold" fontSize={28} textAlign={'center'}>
        TERMS AND CONDITIONS AGREEMENT
      </Typography>
      <FormControlLabel
        onChange={onAgree}
        label={
          <Typography variant="h5">
            I agree to confirm all terms and conditions of transportation with the airline prior to the stated date of departure
          </Typography>
        }
        control={<Checkbox color="secondary" checked={isAgree} />}
        sx={{ pl: 3 }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">CONDITION OF CARRIAGE</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {conditions.map((item, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    ARTICLE {index + 2}. {item.header}
                  </Typography>
                  <Typography color="text.secondary">{item.content}</Typography>
                </CardContent>
              </Card>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ImportantNotices;

export const conditions = [
  {
    header: 'APPLICATION OF CONDITIONS OF CARRIAGE',
    content:
      'On some services, we may have arrangements with other carriers known as “codeshares”. This means that, even if you have a reservation with us and hold a ticket where our name or airline designator code is indicated as the carrier, the aircraft may be operated by another carrier. Except as provided in these Conditions, in the event of inconsistency between these Conditions and the key Conditions of Carriage set out in your Itinerary or between these Conditions and any Carrier’s Regulations we may have dealing with particular subjects, these Conditions shall prevail to the extent of the inconsistency.'
  },
  {
    header: 'TICKETS/ITINERARY',
    content:
      "If Passenger pass away before the flight (before boarding), Passenger's Ticket will be fully refunded (excluding booking & service fees and payment facilitation fees). The ticket of an accompanying passenger including foster parents/caretaker, spouse, children (natural / adopted children / spouse's children), legal siblings will be refunded in full. or will be entitled to free flight change (fare difference still applies). This assistance is granted upon receipt of a valid death certificate and this extension is not more than 45 days from the date of the incident."
  },
  {
    header: 'SPECIAL PASSENGER',
    content:
      'Infant means a child aged seven (07) days to under two 02 years old as of the date of departure. Infant age is calculated by flight sector. Infants are required to be accompanied by an Adult parent or Legal guardian who is eighteen (18) years of age or older and are healthy enough to care for the Infant in flight.\nWe only accept transportation of healthy, term babies. In case Infants with abnormal health and/or premature birth are required to go through a medical procedure according to Article 4.7 of this Regulation and be accompanied by a doctor or nurse of pediatric specialists.'
  },
  {
    header: ' FARES',
    content:
      "Fares apply only to carriage from the airport at the point of origin to the airport at the point of destination unless otherwise stated. Fares do not include road and waterway service charges unless otherwise specified by us. Passenger' fares will not include meals and beverages unless the terms and conditions of the Fares specify otherwise.\nFares will be calculated in accordance with our Tariff in effect on the date of payment for the Ticket for the flight or flights concerned. Applicable Tariffs are those published by us or on our behalf, whether electronically or by way of another medium. Fares may exclude administration fees and other charges unless otherwise specifically stated by us."
  },
  {
    header: 'TAXES AND CHARGES',
    content:
      'Any tax, fee or charge imposed by the Government or other authority or by the operator of an airport in respect of your use of any services or facilities will be in addition to our fares, administration fees and charges and shall be borne by you, unless otherwise specifically stated by us. Such taxes, fees and charges imposed on air travel may change from time to time and can be imposed additionally even after the date that your Booking has been confirmed. You shall nevertheless bear such tax, fee or charge as and when they fall due prior to departure.'
  }
];
