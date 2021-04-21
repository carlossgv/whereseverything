import React, { useState, useEffect } from 'react';
import FinishContainer from '../FinishContainer/FinishContainer';
import OptionsSquare from '../OptionsSquare/OptionsSquare';
import './ImageContainer.css';
import StopWatch from '../Stopwatch/Stopwatch';
import { useLocation } from 'react-router-dom';
import { Image } from '../../Functions';

const ImageContainer = () => {
  const [coordinates, setCoordinates] = useState({
    squareX: '',
    squareY: '',
    optionsX: '',
    optionsY: '',
  });
  const [visibility, setVisibility] = useState('hidden');
  const [isFinished, setIsFinished] = useState(null);
  const [time, setTime] = useState(0);
  const [options, setOptions] = useState(null);
  const [image, setImage] = useState({
    url: '',
    Image: '',
    name: HeaderView()
  });
  console.log(options);

  function HeaderView() {
    const location = useLocation();
    return location.pathname.split('/')[2];
  }

  // const imageName = 

  useEffect(() => {
    console.log('rebooting options list');
    const imageObject = Image(image.name);

    import(`../../static/images/${image.name}.jpg`).then((imageFile) => {
      setImage({ url: imageFile.default, Image: imageObject });
    });

    async function createOptionsArray(imageName) {
      const imageOptions = await imageObject.getImageData(image.name);

      const asyncOptions = [];

      for (const option in imageOptions) {
        asyncOptions.push(imageOptions[option]);
      }
      console.log(asyncOptions);
      setOptions(asyncOptions);
    }

    createOptionsArray(image.name);
  }, []);

  const handleOnMouseDown = (e) => {
    if (e.button === 0 && e.target.id === 'nonModalImage') {
      const img = document.querySelector('#nonModalImage');
      setVisibility('hidden');

      const returnedCoordinates = image.Image.getCoordinates(e, img);

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

    const newOptionsObject = image.Image.checkClick(
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


    //TODO: CHECK IF ALL STUFF IS LOCATED
    const isFinished = image.Image.checkIsFinished(newOptionsArray);
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

  console.log(coordinates.posX, coordinates.posY)

  return (
    
    <div className="imageContainer" onMouseDown={handleOnMouseDown}>
      {isFinished && (
        <FinishContainer display={'block'} imageName={image.name} time={time} />
      )}
      <StopWatch isFinished={isFinished} logTime={logTime} />
      <div className="image">
        <img id="nonModalImage" src={image.url} alt={image.Image.alt} />
        {options && (
          <OptionsSquare
            visibility={visibility}
            coordinates={coordinates}
            options={options}
            handleOptionsClick={handleOptionsClick}
          />
        )}
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
