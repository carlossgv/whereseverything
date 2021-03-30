import React from 'react';
import ImageContainer from '../ImageContainer/ImageContainer';
import testImage from '../../static/images/spaceImage.jpg';

const Main = () => {
  const testOptions = ['Box of Vinyls', 'fish', 'item 3', 'item 4', 'item 5'];


  return <ImageContainer img={testImage} options={testOptions} alt="shows image" />;
};

export default Main;
