import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [sessionLength, setSessionLength] = useState(2);
  const [breakLength, setBreakLength] = useState(1);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionMode, setSessionMode] = useState(true); // To track if the timer is in session or break mode

  useEffect(() => {
    if (isRunning) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            // Switch between session and break when time is up
            if (sessionMode) {
              setTimeLeft(breakLength * 60);
            } else {
              setTimeLeft(sessionLength * 60);
            }
            setSessionMode((prevMode) => !prevMode); // Toggle between session and break mode
            return sessionMode ? breakLength * 60 : sessionLength * 60; // Fix the reset issue
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [isRunning, sessionLength, breakLength, sessionMode]);

  const handleStartPauseClick = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setSessionMode(true);
    setTimeLeft(sessionLength * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      <div>
        <label>
          Session Length:
          <input
            type="number"
            value={sessionLength}
            onChange={(e) => setSessionLength(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Break Length:
          <input
            type="number"
            value={breakLength}
            onChange={(e) => setBreakLength(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <div>{sessionMode ? 'Session' : 'Break'}</div>
        <div>{formatTime(timeLeft)}</div>
        <button onClick={handleStartPauseClick}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;

