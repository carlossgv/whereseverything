import React, { useState } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './ImagesCarousel.css';
import fantasyImage from '../../static/images/fantasyImage.jpg';
import showsImage from '../../static/images/showsImage.jpg';
import spaceImage from '../../static/images/spaceImage.jpg';
import underWaterImage from '../../static/images/underWaterImage.jpg';
import { Link } from 'react-router-dom';

const MyCarousel = () => {
  const [value, setValue] = useState(0);

  const onChange = (value) => {
    setValue(value);
  };

  // TODO: GET IMAGE LIST DINAMICALLY FROM FIREBASE

  const imageList = [
    { url: fantasyImage, name: Object.keys({ fantasyImage }) },
    { url: showsImage, name: Object.keys({ showsImage }) },
    { url: spaceImage, name: Object.keys({ spaceImage }) },
    { url: underWaterImage, name: Object.keys({ underWaterImage }) },
  ];

  return (
    <div>
      <Carousel
        arrows
        infinite
        className="imagesCarousel"
        value={value}
        onChange={onChange}
        plugins={['arrows']}
      >
        {imageList.map((image) => {
          return (
            <Link to={`/image/${image.name}`} key={image.name}>
              <img className="carouselImg" src={image.url} alt={''} />
            </Link>
          );
        })}
      </Carousel>
      <Dots value={value} onChange={onChange} number={4} />
    </div>
  );
};

export default MyCarousel;
