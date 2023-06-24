import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
// import { StepIcon } from '@mui/material';
// import {StepperType, ManageBookingStepIcon } from './stepper.type';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(147,133,216) 10%,rgb(172,160,224) 50%,rgb(138,35,135) 90%)',
      // vertical padding + font size from searchIcon
      paddingLeft: (1, 1, 1, 1),
      transition: theme.transitions.create('backgroundImage'),
      marginLeft: '10px',
      marginRight: '10px'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(147,133,216) 10%,rgb(172,160,224)  50%,rgb(138,35,135) 90%)',
      // vertical padding + font size from searchIcon
      paddingLeft: (1, 1, 1, 1),
      transition: theme.transitions.create('backgroundImage'),
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
    transition: theme.transitions.create('backgroundImage'),
    backgroundImage: 'linear-gradient( 95deg,rgb(147,133,216)',
    marginLeft: '10px',
    marginRight: '10px'
  }
}));

// const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccd',
//   zIndex: 1,
//   color: '#fff',
//   width: 35,
//   height: 35,
//   display: 'flex',
//   borderRadius: '50%',
//   justifyContent: 'center',
//   alignItems: 'center',
//   ...(ownerState.active && {
//     backgroundImage: 'linear-gradient( 136deg, rgb(205,112,218) 10%, rgb(114,74,186) 68%, rgb(96,47,146) 100%)',
//     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
//   }),
//   ...(ownerState.completed && {
//     backgroundImage: 'linear-gradient( 136deg, rgb(205,112,218) 10%, rgb(114,74,186) 68%, rgb(96,47,146) 100%)'
//   })
// }));

// function BookingSteppers(props) {
//   const { active, completed, className } = props;

//   const icons = StepperType.BOOKING.icons;

//   return (
//     <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
//       {icons[String(props.icon)]}
//     </ColorlibStepIconRoot>
//   );
// }

const S4prjSteppers = ({ innerType, activeStep }) => {
  let steps = innerType.steppers;
  let stepIconComponents = innerType.getStepIconComponent;
  // switch (stepperName) {
  //   case StepperType.BOOKING.name:
  //     steps = StepperType.BOOKING.steppers;
  //     stepIconComponents = BookingSteppers;
  //     break;
  //   case StepperType.MANAGE_BOOKING.name:
  //     steps = StepperType.MANAGE_BOOKING.steppers;
  //     stepIconComponents = ManageBookingStepIcon;
  //     break;
  // }

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={stepIconComponents}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default S4prjSteppers;
