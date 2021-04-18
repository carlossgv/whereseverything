import React, { useState, useEffect } from 'react';
import FinishContainer from '../FinishContainer/FinishContainer';
import OptionsSquare from '../OptionsSquare/OptionsSquare';
import './ImageContainer.css';
import StopWatch from '../Stopwatch/Stopwatch';
import { useLocation } from 'react-router-dom'


const ImageContainer = () => {
  const [coordinates, setCoordinates] = useState({
    squareX: '',
    squareY: '',
    optionsX: '',
    optionsY: '',
  });
  const [visibility, setVisibility] = useState('hidden');
  // const [containerOptions, setContainerOptions] = useState(options);
  const [isFinished, setIsFinished] = useState(null);
  const [time, setTime] = useState(0);
  const [options, setOptions] = useState(null);
  const [image, setImage] = useState({
    url: '',
    Image: '',
  });
  console.log(options);

  
  function HeaderView() {
    const location = useLocation();
    return location.pathname.split('/')[2]
  }

  const imageName = HeaderView();

  useEffect(() => {
    console.log('rebooting options list');
    const imageObject = Image('showsImage');

    import(`../../static/images/${imageName}.jpg`).then((imageFile) => {
      setImage({ url: imageFile.default, Image: imageObject });
    });

    async function createOptionsArray(imageName) {
      const imageOptions = await imageObject.getImageData(imageName);

      const asyncOptions = [];

      for (const option in imageOptions) {
        asyncOptions.push(imageOptions[option]);
      }
      console.log(asyncOptions);
      setOptions(asyncOptions);
    }

    createOptionsArray(imageName);
  }, []);

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

    setOptions(newOptionsArray);

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
        <img id="nonModalImage" src={image.url} alt={image.Image.alt} />
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
          alt={`${image.Image.alt} zoomed`}
        ></img>

        <div id="caption"></div>
      </div>
    </div>
  );
};

export default ImageContainer;
