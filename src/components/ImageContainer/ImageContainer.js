import React, { useState } from 'react';
import OptionsSquare from '../OptionsSquare/OptionsSquare';
import './ImageContainer.css';

const ImageContainer = ({ image, imageName, url, options, alt }) => {
  const [coordinates, setCoordinates] = useState({
    squareX: '',
    squareY: '',
    optionsX: '',
    optionsY: '',
  });
  const [visibility, setVisibility] = useState('hidden');
  const [containerOptions, setContainerOptions] = useState(options);

  console.log(containerOptions);

  const handleOnMouseDown = (e) => {
    if (e.button === 0 && e.target.id === 'nonModalImage') {
      const img = document.querySelector('#nonModalImage');
      setVisibility('hidden');

      const returnedCoordinates = image.getCoordinates(e, img);

      console.log(returnedCoordinates.posX, returnedCoordinates.posY);

      setCoordinates({
        posX: returnedCoordinates.posX,
        posY: returnedCoordinates.posY,
        squareX: returnedCoordinates.squareX,
        squareY: returnedCoordinates.squareY,
        optionsX: returnedCoordinates.optionsX,
        optionsY: returnedCoordinates.optionsY,
      });
      setVisibility('');
    }

    if (e.button === 1) {
      const modal = document.querySelector('#myModal');
      if (!modal.style.display || modal.style.display === 'none') {
        const modalImg = document.querySelector('#modalImage');
        modal.style.display = 'block';
        modalImg.src = e.target.src;
      } else {
        modal.style.display = 'none';
      }
    }
  };

  const handleOptionsClick = (e) => {
    const selection = e.target.innerHTML;
    console.log(e.target.innerHTML);

    const newOptionsObject = image.checkClick(
      coordinates.posX,
      coordinates.posY,
      selection,
      imageName,
      options
    );

    const newOptionsArray = [];

    for (const option in newOptionsObject) {
      newOptionsArray.push(newOptionsObject[option]);
    }

    console.log(newOptionsArray);
    setContainerOptions(newOptionsArray);
  };

  return (
    <div className="imageContainer" onMouseDown={handleOnMouseDown}>
      <div className="image">
        <img id="nonModalImage" src={url} alt={alt} />
        <OptionsSquare
          visibility={visibility}
          coordinates={coordinates}
          options={containerOptions}
          handleOptionsClick={handleOptionsClick}
        />
      </div>
      <div id="myModal" className="modal">
        <img
          className="modalContent"
          id="modalImage"
          alt={`${alt} zoomed`}
        ></img>

        <div id="caption"></div>
      </div>
    </div>
  );
};

export default ImageContainer;
