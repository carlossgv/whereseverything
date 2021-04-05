import React, { useState } from 'react';
import Timer from '../Timer/Timer';

function StopWatch(props) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  React.useEffect(() => {
    handleStart();
  }, []);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  React.useEffect(() => {
    console.log(props.isFinished);
    if (props.isFinished) {
      handlePauseResume();
      props.logTime(time);
      console.log(time);
    }
  }, [props.isFinished]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  return (
    <div className="stop-watch">
      <Timer time={time} />
    </div>
  );
}

export default StopWatch;
