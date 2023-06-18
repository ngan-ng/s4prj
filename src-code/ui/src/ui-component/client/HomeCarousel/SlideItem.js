import { Paper, Button } from '@mui/material';

const SlideItem = ({ item }) => {
  return (
    <Paper sx={{ m: 0, p: 0, width: '100%' }} square elevation={0} variant="string">
      <img src={item.image} alt={item.title} style={{ m: 0, px: 0, width: '100%', height: '558px' }} />
      <Paper
        style={{
          m: 'auto',
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center',
          alignContent: 'center',
          flexDirection: 'row'
        }}
      >
        <h2 style={{ my: 0, mr: 2, p: 0 }}>{item.title}</h2>
        <Button
          sx={{ ml: 2, p: 0 }}
          className="CheckButton"
          onClick={() => {
            // Navigate to item.url
          }}
        >
          Check it out!
        </Button>
      </Paper>
    </Paper>
  );
};

export default SlideItem;
