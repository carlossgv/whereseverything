import React from 'react';
import { placeSquare } from '../../Functions';
import './ImageContainer.css';

const ImageContainer = (props) => {
  const handleOnMouseDown = (e) => {
    const img = document.querySelector('#nonModalImage');
    if (e.button === 0 && e.target.id === 'nonModalImage') {

      placeSquare(e, img);
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
