import { Paper, Link, Button } from '@mui/material';

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
        <Link href={item.url} target="_blank" variant="button" sx={{ ml: 2, p: 0 }} className="CheckButton">
          <Button color="secondary" variant="outlined" sx={{ p: 2 }}>
            Check it out!
          </Button>
        </Link>
      </Paper>
    </Paper>
  );
};

export default SlideItem;
