import { Fragment } from 'react';
import S4prjSteppers from 'ui-component/client/S4prjSteppers';

const Booking = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleFinished = () => {};

  return (
    <Fragment>
      <div>Booking</div>
      <S4prjSteppers
        stepperName={pageType.BOOKING.name}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        onFinished={handleFinished}
      />
    </Fragment>
  );
};
export default Booking;
