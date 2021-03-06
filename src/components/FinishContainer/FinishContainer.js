import './FinishContainer.css';
import React, { useEffect } from 'react';
import Timer from '../Timer/Timer';
import { checkCookie } from '../../Functions';
import { Link } from 'react-router-dom';

const FinishContainer = ({ imageName, time }) => {
  useEffect(() => {
    if (time !== 0) {
      checkCookie(imageName, time);
    }

    // return () => {
    //   cleanup;
    // };
  }, [time]);

  return (
    <div id="myModal" className="finishContainer">
      <div className="modal-content" id="caption">
        <h1>FINISHED!</h1>
        <h3>
          Your time was: <Timer time={time} />
        </h3>
        <Link to="/">
          <button>Play again</button>
        </Link>
      </div>
    </div>
  );
};

export default FinishContainer;
