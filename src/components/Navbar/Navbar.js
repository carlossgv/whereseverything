import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [howToDisplay, setHowToDisplay] = useState('none');
  const [leaderBoardDisplay, setLeaderBoardDisplay] = useState('none');

  return (
    <nav>
      <h1>WHERE IS EVERYTHING?</h1>
      <h4 onClick={() => setLeaderBoardDisplay('block')}>Leaderboard</h4>
      <h4 onClick={() => setHowToDisplay('block')}>How to play</h4>

      <div id="howTo" className="modal" style={{ display: howToDisplay }}>
        <div className="modal-content howTo">
          <span className="close" onClick={() => setHowToDisplay('none')}>
            &times;
          </span>
          <p>HOW TO PLAY</p>
        </div>
      </div>
      <div
        id="leaderBoard"
        className="modal"
        style={{ display: leaderBoardDisplay }}
      >
        <div className="modal-content leaderBoard">
          <span className="close" onClick={() => setLeaderBoardDisplay('none')}>
            &times;
          </span>
          <p>LEADERBOARD</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
