import React from 'react';
import './OptionsSquare.css';

const OptionsSquare = (props) => {
  const { visibility, coordinates, options } = props;

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
          {options.map((option) => (
            <li key={option} className="option">
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OptionsSquare;
