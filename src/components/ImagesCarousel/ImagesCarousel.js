import React, { useState } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './ImagesCarousel.css';
import { getImageUrl } from '../../Functions';
// import fantasyImage from '../../static/images/fantasyImage.jpg';
// import showsImage from '../../static/images/showsImage.jpg';
// import spaceImage from '../../static/images/spaceImage.jpg';
// import underWaterImage from '../../static/images/underWaterImage.jpg';

const MyCarousel = () => {
  const [value, setValue] = useState(0);

  const onChange = (value) => {
    setValue(value);
  };

  const imageList = [
    'fantasyImage',
    'showsImage',
    'spaceImage',
    'underWaterImage',
  ];

  const imageDivs = imageList.map((imageName) => {
    const imgUrl = getImageUrl(imageName);
    return <img className="carouselImg" src={imgUrl} alt={imageName} />;
  });

  console.log(imageDivs);

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
        {imageDivs}
        {/* <img className="carouselImg" src={fantasyImage} alt={''} />
        <img className="carouselImg" src={underWaterImage} alt={''} />
        <img className="carouselImg" src={showsImage} alt={''} />
        <img className="carouselImg" src={spaceImage} alt={''} /> */}
      </Carousel>
      <Dots value={value} onChange={onChange} number={4} />
    </div>
  );
};

export default MyCarousel;
