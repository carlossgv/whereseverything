import React, { useState } from 'react';
import FinishContainer from '../FinishContainer/FinishContainer';
import OptionsSquare from '../OptionsSquare/OptionsSquare';
import './ImageContainer.css';
import StopWatch from '../Stopwatch/Stopwatch';

const ImageContainer = ({ image, url, options, alt }) => {
  const [coordinates, setCoordinates] = useState({
    squareX: '',
    squareY: '',
    optionsX: '',
    optionsY: '',
  });
  const [visibility, setVisibility] = useState('hidden');
  const [containerOptions, setContainerOptions] = useState(options);
  const [isFinished, setIsFinished] = useState(null);
  const [time, setTime] = useState(0);
  console.log(containerOptions);

  const handleOnMouseDown = (e) => {
    if (e.button === 0 && e.target.id === 'nonModalImage') {
      const img = document.querySelector('#nonModalImage');
      setVisibility('hidden');

      const returnedCoordinates = image.getCoordinates(e, img);

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
    setIsFinished(false);

    const selection = e.target.innerHTML;

    const newOptionsObject = image.checkClick(
      coordinates.posX,
      coordinates.posY,
      selection,
      options
    );

    const newOptionsArray = [];

    for (const option in newOptionsObject) {
      newOptionsArray.push(newOptionsObject[option]);
    }

    setContainerOptions(newOptionsArray);

    console.log(newOptionsArray);

    //TODO: CHECK IF ALL STUFF IS LOCATED
    const isFinished = image.checkIsFinished(newOptionsArray);
    console.log(isFinished);
    if (isFinished) {
      setVisibility('hidden');
      console.log(time);
    }
    setIsFinished(isFinished);
  };

  const logTime = (time) => {
    setTime(time);
  };

  return (
    <div className="imageContainer" onMouseDown={handleOnMouseDown}>
      {isFinished && <FinishContainer display={'block'} imageName={image.name} time={time} />}
      <StopWatch isFinished={isFinished} logTime={logTime} />
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
