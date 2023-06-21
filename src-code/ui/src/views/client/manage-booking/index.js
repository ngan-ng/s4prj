import { useState } from 'react';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';
import pageType from 'ui-component/client/S4prjSteppers/stepper.type';

const ManageBooking = () => {
  const [activeStep, setActiveStep] = useState(0);

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
    </>
  );
};
export default ManageBooking;
