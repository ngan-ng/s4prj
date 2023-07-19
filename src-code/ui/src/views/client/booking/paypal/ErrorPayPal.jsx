import { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ErrorPayPal = () => {
  const location = useLocation();
  const [errMess] = useState(location.state?.errMess);
  return (
    <Fragment>
      <h1>ERROR</h1>
      <p>{errMess}</p>
    </Fragment>
  );
};
