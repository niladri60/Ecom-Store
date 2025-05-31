import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { homeCarouselData } from './carouselData';

export const MainCarousel = () => {
  const items = homeCarouselData.map((item, index) => (
    <img
      key={index}
      className="w-full h-[500px] object-cover cursor-pointer"
      role="presentation"
      src={item.image}
      alt={`Carousel Image ${index + 1}`}
    />
  ));

  return (
    <AliceCarousel
      items={items}
      autoPlay
      autoPlayInterval={2000}
      infinite
      disableButtonsControls
      disableDotsControls={false}
    />
  );
};
