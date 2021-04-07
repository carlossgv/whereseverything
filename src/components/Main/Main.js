import React, { useState, useEffect } from 'react';
import { Image } from '../../Functions';
import ImagesCarousel from '../ImagesCarousel/ImagesCarousel';

const Main = () => {
  const [options, setOptions] = useState(null);
  const [image, setImage] = useState({
    url: '',
    Image: '',
  });

  const imageName = 'showsImage';

  useEffect(() => {
    console.log('rebooting options list');
    const imageObject = Image('showsImage');

    import(`../../static/images/${imageName}.jpg`).then((imageFile) => {
      setImage({ url: imageFile.default, Image: imageObject });
    });

    async function createOptionsArray(imageName) {
      const imageOptions = await imageObject.getImageData(imageName);

      const asyncOptions = [];

      for (const option in imageOptions) {
        asyncOptions.push(imageOptions[option]);
      }
      console.log(asyncOptions);
      setOptions(asyncOptions);
    }

    createOptionsArray(imageName);
  }, []);

  return (
    <div className="Main">
      <ImagesCarousel />
    </div>
  );
};

export default Main;
