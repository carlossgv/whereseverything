import React from 'react';
import ImageContainer from '../ImageContainer/ImageContainer';
import testImage from '../../static/images/spaceImage.jpg';

const Main = () => {
  return <ImageContainer img={testImage} alt="shows image" />;
};

export default Main;
