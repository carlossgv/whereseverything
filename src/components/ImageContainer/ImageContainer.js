import React, { useState } from 'react';
import { getCoordinates } from '../../Functions';
import './ImageContainer.css';

const ImageContainer = (props) => {
  const [coordinates, setCoordinates] = useState({
    squareX: '',
    squareY: '',
    optionsX: '',
    optionsY: '',
  });

  const [visibility, setVisibility] = useState('hidden');

  const handleOnMouseDown = (e) => {
    const img = document.querySelector('#nonModalImage');
    if (e.button === 0 && e.target.id === 'nonModalImage') {
      setVisibility('hidden');

      const returnedCoordinates = getCoordinates(e, img);
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

  // TODO: CREATE SQUARE AND LIST AS INDEPENDENT COMPONENT

  return (
    <div className="imageContainer" onMouseDown={handleOnMouseDown}>
      <div className="image">
        <img id="nonModalImage" src={props.img} alt={props.alt} />
        <div
          className={`square ${visibility}`}
          style={{
            left: `${coordinates.squareX}px`,
            top: `${coordinates.squareY}px`,
          }}
        ></div>
        <div
          className={`optionsDiv ${visibility}`}
          style={{
            left: `${coordinates.optionsX}px`,
            top: `${coordinates.optionsY}px`,
          }}
        >
          <ul>
            {props.options.map((option) => (
              <li key={option} className="option">
                {option}
              </li>
            ))}
          </ul>
        </div>
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
