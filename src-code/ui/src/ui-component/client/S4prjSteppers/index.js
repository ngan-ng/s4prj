import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(147,133,216) 10%,rgb(172,160,224) 50%,rgb(138,35,135) 90%)',
      // vertical padding + font size from searchIcon
      paddingLeft: (1, 1, 1, 1),
      marginLeft: '10px',
      marginRight: '10px'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(147,133,216) 10%,rgb(172,160,224)  50%,rgb(138,35,135) 90%)',
      // vertical padding + font size from searchIcon
      paddingLeft: (1, 1, 1, 1),
      marginLeft: '10px',
      marginRight: '10px'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : '#eaeaf0',
    borderRadius: 5,
    paddingLeft: (1, 1, 1, 1),
    marginLeft: '10px',
    marginRight: '10px'
  }
}));

const S4prjSteppers = ({ innerType, activeStep }) => {
  let steps = innerType.steppers;
  let stepIconComponent = innerType.getStepIconComponent;

  return (
    <Stack sx={{ width: '100%', mt: 2 }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={stepIconComponent}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default S4prjSteppers;
