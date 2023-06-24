import { IconTicket } from '@tabler/icons';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { EventSeat, Flight, NotificationImportant, PeopleAlt } from '@mui/icons-material';
import { ReactComponent as BoardingPassIcon } from 'assets/images/icons/boarding-pass-2.svg';
import styled from '@emotion/styled';

export const StepperType = {
  BOOKING: {
    name: 'BOOKING',
    steppers: ['Select Flight', 'Passenger on Flight', 'Seat Assignment', 'Payment', 'Itinerary'],
    icons: {
      1: <IconTicket fontSize="small" />,
      2: <GroupAddIcon fontSize="small" />,
      3: <VideoLabelIcon fontSize="small" />,
      4: <SettingsIcon fontSize="small" />,
      5: <VideoLabelIcon fontSize="small" />
    },
    getStepIconComponent: BookingStepIcon
  },
  MANAGE_BOOKING: {
    name: 'MANAGE-BOOKING',
    steppers: ['Select Flight', 'Passenger on Flight', 'Seat Assignment', 'Important Notices', 'Boarding Pass'],
    icons: {
      1: <Flight fontSize="small" />,
      2: <PeopleAlt fontSize="small" />,
      3: <EventSeat fontSize="small" />,
      4: <NotificationImportant fontSize="small" />,
      5: <BoardingPassIcon fontSize="small" />
    },
    getStepIconComponent: ManageBookingStepIcon
  }
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccd',
  zIndex: 1,
  color: '#fff',
  width: 35,
  height: 35,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(205,112,218) 10%, rgb(114,74,186) 68%, rgb(96,47,146) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(205,112,218) 10%, rgb(114,74,186) 68%, rgb(96,47,146) 100%)'
  })
}));

function BookingStepIcon(props) {
  const { active, completed, className } = props;

  const icons = StepperType.BOOKING.icons;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
function ManageBookingStepIcon(props) {
  const { active, completed, className } = props;

  const icons = StepperType.MANAGE_BOOKING.icons;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
