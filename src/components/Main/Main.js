import React from 'react';
import ImageContainer from '../ImageContainer/ImageContainer';
import testImage from '../../static/images/showsImage.jpg';
import { checkClick, getImageInfo } from '../../Functions';

const Main = () => {
  const imageInfo = getImageInfo('showsImage');

  const testClick = checkClick(1, 1, 'Fish', 'showsImage');

  return <ImageContainer img={testImage} alt="shows image" />;
};

export default Main;
