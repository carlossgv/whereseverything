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

  const imageList = [
    { url: fantasyImage, name: Object.keys({ fantasyImage }) },
    { url: showsImage, name: Object.keys({ showsImage }) },
    { url: spaceImage, name: Object.keys({ spaceImage }) },
    { url: underWaterImage, name: Object.keys({ underWaterImage }) },
  ];

  // useEffect(() => {
  //   const imageDivs = Promise.all(
  //     imageList.map(async (imageName) => {
  //       const imgUrl = await getImageUrl(imageName);
  //       console.log(imgUrl);
  //       return (
  //         <img
  //           key={imageName}
  //           className="carouselImg"
  //           src={imgUrl}
  //           alt={imageName}
  //         />
  //       );
  //     })
  //   );
  //   console.log(imageDivs);
  //   setImageArray(imageDivs);
  // }, []);

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
            <Link to={`/image/${image.name}`}>
              <img className="carouselImg" src={image.url} alt={''} />
            </Link>
          );
        })}
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
