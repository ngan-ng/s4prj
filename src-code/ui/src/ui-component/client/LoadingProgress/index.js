import { Box, LinearProgress } from '@mui/material';
import { ReactComponent as LoadingFlightIcon } from 'assets/images/icons/animate-loading-flight.svg';
import React, { useState, useEffect } from 'react';

const LoadingProgress = ({ props }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (props) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 0);
      return () => {
        clearInterval(timer);
      };
    }
  }, [props]);
  return (
    <>
      <LinearProgress color="secondary" value={progress} />
      <Box boxSizing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingFlightIcon />
      </Box>
    </>
  );
};

export default LoadingProgress;
