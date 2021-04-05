import './FinishContainer.css';
import React from 'react';
import Timer from '../Timer/Timer';

const FinishContainer = ({ time }) => {
  return (
    <div id="myModal" className="finishContainer">
      <div className="modal-content" id="caption">
        <h1>FINISHED!</h1>
        <h3>
          Your time was: <Timer time={time} />
        </h3>
        <button>Play again</button>
      </div>
    </div>
  );
};

export default FinishContainer;
