import React, { useState, useEffect } from 'react';
import { Image } from '../../Functions';
import ImageContainer from '../ImageContainer/ImageContainer';
import testImage from '../../static/images/loadingplaceholder.jpg';

const Main = () => {
  const [options, setOptions] = useState(null);
  const [image, setImage] = useState({
    url: testImage,
  });

  useEffect(() => {
    const image = Image('showsImage');
    const imageName = 'showsImage';

    import(`../../static/images/${imageName}.jpg`).then((image) => {
      setImage({ url: image.default });
    });

    async function testFunc(imageName) {
      const imageOptions = await image.getImageData(imageName);

      const asyncOptions = [];

      for (const option in imageOptions) {
        asyncOptions.push(option);
      }
      setOptions(asyncOptions);
    }

    testFunc(imageName);
  }, []);

  return (
    <div className="Main">
      {options && (
        <ImageContainer img={image.url} options={options} alt="shows image" />
      )}
    </div>
  );
};

export default Main;
