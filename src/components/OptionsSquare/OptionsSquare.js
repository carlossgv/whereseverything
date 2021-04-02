import React from 'react';
import './OptionsSquare.css';

const OptionsSquare = ({
  visibility,
  coordinates,
  options,
  handleOptionsClick,
}) => {
  return (
    <div className="optionsSquare">
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
          {options.map((option) => {
            let locatedClass = '';
            if (option.isLocated) {
              locatedClass = 'isLocated';
            }

            return (
              <li
                key={option.name}
                className={`option ${locatedClass}`}
                onClick={handleOptionsClick}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OptionsSquare;
