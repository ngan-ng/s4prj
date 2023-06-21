import { IconTicket } from '@tabler/icons';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';

const StepperType = {
  BOOKING: {
    name: 'BOOKING',
    steppers: ['Select Flight', 'Passenger on Flight', 'Seat Assignment', 'Important Notices', 'Payment'],
    icons: {
      1: <IconTicket fontSize="small" />,
      2: <GroupAddIcon fontSize="small" />,
      3: <VideoLabelIcon fontSize="small" />,
      4: <SettingsIcon fontSize="small" />,
      5: <VideoLabelIcon fontSize="small" />
    }
  },
  MANAGE_BOOKING: {
    name: 'MANAGE-BOOKING',
    steppers: ['Select Flight', 'Passenger on Flight', 'Seat Assignment', 'Important Notices', 'Boarding Pass'],
    icons: {
      1: <IconTicket fontSize="small" />,
      2: <GroupAddIcon fontSize="small" />,
      3: <VideoLabelIcon fontSize="small" />,
      4: <SettingsIcon fontSize="small" />,
      5: <VideoLabelIcon fontSize="small" />
    }
  }
};
export default StepperType;
