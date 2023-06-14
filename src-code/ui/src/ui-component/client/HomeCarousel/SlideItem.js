import { Paper, Button } from '@mui/material';

const SlideItem = ({ item }) => {
  return (
    <Paper sx={{ mx: 0, px: 0, width: '100%' }}>
      <img src={item.image} alt={item.title} style={{ mx: 0, px: 0, width: '100%', height: '500px' }} />
      <div style={{ my: 0, py: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <h2 style={{ mr: 2, p: 0 }}>{item.title}</h2>
        <Button
          sx={{ ml: 2, p: 0 }}
          className="CheckButton"
          onClick={() => {
            // Navigate to item.url
          }}
        >
          Check it out!
        </Button>
      </div>
    </Paper>
  );
};

export default SlideItem;
