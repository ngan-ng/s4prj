import S4prjSteppers from 'ui-component/client/S4prjSteppers';

const handleFinished = () => {

};
const ManageBooking = () => {
  return (
    <>
      BOOKING MANAGEMENT
      <S4prjSteppers pageType={'manage-booking'} onFinished={handleFinished} />
    </>
  );
};
export default ManageBooking;
