import React from 'react';
import './ImageContainer.css';

const ImageContainer = (props) => {
  const handleOnContextMenu = (e) => {
    const img = document.querySelector('#nonModalImage');
    if (e.button === 0 && e.target.id === 'nonModalImage') {
      let posX = e.offsetX ? e.offsetX : e.pageX - img.offsetLeft;
      let posY = e.offsetY ? e.offsetY : e.pageY - img.offsetTop;

      console.log(posX, posY);

      
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
    <div className="imageContainer" onMouseDown={handleOnContextMenu}>
      <img id="nonModalImage" src={props.img} alt={props.alt} />

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
