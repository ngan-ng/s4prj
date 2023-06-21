// import { LinearProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { isFetchingPnr, selectPnr } from 'store/booking/booking.selector';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';
import pageType from 'ui-component/client/S4prjSteppers/stepper.type';

const ManageBooking = () => {
  const [activeStep, setActiveStep] = useState(0);
  // const yourBookings = useSelector(selectPnr);
  // const isFetching = useSelector(isFetchingPnr);

  useEffect(() => {
    // console.log('Effect: ' + yourBookings[0].pnr);
  }, []);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleFinished = () => {};

  return (
    <>
      BOOKING MANAGEMENT
      <S4prjSteppers
        stepperName={pageType.MANAGE_BOOKING.name}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        onFinished={handleFinished}
      />
      {/* {isFetching && (
        <Typography>
          FETCHING... <LinearProgress />
        </Typography>
      )} */}
      {/* {yourBookings && yourBookings?.map((item) => item.email+ ' ')} */}
    </>
  );
};
export default ManageBooking;
