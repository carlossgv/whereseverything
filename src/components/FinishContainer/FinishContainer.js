import './FinishContainer.css';
import React from 'react';

const FinishContainer = () => {
  return (
    <div id="myModal" className="finishContainer">
      <div className="modal-content" id="caption">
        <h1>FINISHED!</h1>
        <h3>Your time was: </h3>
        <button>Play again</button>
      </div>
    </div>
  );
};

export default FinishContainer;
