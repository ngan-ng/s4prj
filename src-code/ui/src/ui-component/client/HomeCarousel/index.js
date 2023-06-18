import Carousel from 'react-material-ui-carousel';
import Item from './SlideItem';
import slider from './slider.json';

const HomeCarousel = () => {
  return (
    <Carousel>
      {slider.map((item) => (
        <Item sx={{ m: 0, p: 0, width: '100%' }} key={item.id} item={item} />
      ))}
    </Carousel>
  );
};
export default HomeCarousel;
