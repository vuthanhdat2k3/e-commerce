import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography} from '@mui/material';



const steps = [
  "Placed",
  'Order Confirmed',
  'Shipped',
  'Delivered',
  'Returned',
];



export default function OrderTraker({activeStep}) {
    
  return (
    <Box sx={{ width: '100%' }} >
      
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel  sx={{ color: '#9155FD',fontSize: '44px' }}  className={``}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
