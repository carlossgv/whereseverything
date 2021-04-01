import React, { useState } from 'react';
import OptionsSquare from '../OptionsSquare/OptionsSquare';
import './ImageContainer.css';

const ImageContainer = (props) => {
  const [coordinates, setCoordinates] = useState({
    squareX: '',
    squareY: '',
    optionsX: '',
    optionsY: '',
  });
  const [visibility, setVisibility] = useState('hidden');

  console.log(props.options);

  const handleOnMouseDown = (e) => {
    const img = document.querySelector('#nonModalImage');
    if (e.button === 0 && e.target.id === 'nonModalImage') {
      setVisibility('hidden');

      const returnedCoordinates = Image.getCoordinates(e, img);
      setCoordinates({
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

  return (
    <div className="imageContainer" onMouseDown={handleOnMouseDown}>
      <div className="image">
        <img id="nonModalImage" src={props.img} alt={props.alt} />
        <OptionsSquare
          visibility={visibility}
          coordinates={coordinates}
          options={props.options}
        />
      </div>
      <div id="myModal" className="modal">
        <img
          className="modalContent"
          id="modalImage"
          alt={`${props.alt} zoomed`}
        ></img>

        <div id="caption"></div>
      </div>
    </div>
  );
};

export default ImageContainer;
