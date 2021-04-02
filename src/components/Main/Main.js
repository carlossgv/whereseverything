import React, { useState, useEffect } from 'react';
import { Image } from '../../Functions';
import ImageContainer from '../ImageContainer/ImageContainer';

const Main = () => {
  const [options, setOptions] = useState(null);
  const [image, setImage] = useState({
    url: '',
    Image: '',
  });

  const imageName = 'showsImage';

  useEffect(() => {
    const imageObject = Image('showsImage');
    // const imageName = 'showsImage';

    import(`../../static/images/${imageName}.jpg`).then((imageFile) => {
      setImage({ url: imageFile.default, Image: imageObject });
    });

    async function testFunc(imageName) {
      const imageOptions = await imageObject.getImageData(imageName);

      const asyncOptions = [];

      for (const option in imageOptions) {
        asyncOptions.push(imageOptions[option]);
      }
      setOptions(asyncOptions);
    }

    testFunc(imageName);
  }, []);


  return (
    <div className="Main">
      {options && (
        <ImageContainer
          image={image.Image}
          url={image.url}
          options={options}
          alt={imageName}
          imageName={imageName}
        />
      )}
    </div>
  );
};

export default Main;
