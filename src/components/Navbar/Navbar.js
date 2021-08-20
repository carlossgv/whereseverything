import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [howToDisplay, setHowToDisplay] = useState('none');
  const [leaderBoardDisplay, setLeaderBoardDisplay] = useState('none');
  const [credits, setCredits] = useState('none');

  return (
    <nav>
      <div className="navContent">
        <div id="navLeft">
          <Link to="/">
            <h1>WHERE'S EVERYTHING?</h1>
          </Link>
        </div>
        <div className="navRight">
          <span onClick={() => setLeaderBoardDisplay('block')}>
            Leaderboard
          </span>
          <span onClick={() => setHowToDisplay('block')}>How to play</span>
          <span onClick={() => setCredits('block')}>Credits</span>

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
              <span
                className="close"
                onClick={() => setLeaderBoardDisplay('none')}
              >
                &times;
              </span>
              <p>LEADERBOARD</p>
            </div>
          </div>

          <div id="credits" className="modal" style={{ display: credits }}>
            <div className="modal-content credits">
              <span className="close" onClick={() => setCredits('none')}>
                &times;
              </span>
              <p>CREDITS</p>
              <p>Art: Marija Tiurina (@marijatiurina)</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
