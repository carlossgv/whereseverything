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
    console.log(e.target.innerHTML);
    const selection = e.target.innerHTML;
    image.checkClick(coordinates.posX, coordinates.posY, selection, imageName);
  };

  return (
    <div className="imageContainer" onMouseDown={handleOnMouseDown}>
      <div className="image">
        <img id="nonModalImage" src={url} alt={alt} />
        <OptionsSquare
          visibility={visibility}
          coordinates={coordinates}
          options={options}
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
