// src/components/PomodoroTimer.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';

const PomodoroTimer = () => {
  const [mode, setMode] = useState('pomodoro'); // Modes: 'pomodoro', 'shortBreak', 'longBreak'
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => (time > 0 ? time - 1 : 0));
      }, 1000);
    } else if (!isActive && time !== 0 && isPaused) {
      clearInterval(interval);
    }

    if (time === 0) {
      handleCycleEnd();
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  const handleModeChange = (newMode) => {
    if (newMode === 'pomodoro') {
      setTime(1500); // 25 minutes
    } else if (newMode === 'shortBreak') {
      setTime(300); // 5 minutes
    } else if (newMode === 'longBreak') {
      setTime(900); // 15 minutes
    }
    setMode(newMode);
    setIsActive(false);
    setIsPaused(true);
  };

  const handleStartPause = () => {
    setIsActive(true);
    setIsPaused(!isPaused);
  };

  const handleCycleEnd = () => {
    setIsActive(false);
    setIsPaused(true);

    if (mode === 'pomodoro') {
      handleModeChange('shortBreak');
    } else if (mode === 'shortBreak' || mode === 'longBreak') {
      handleModeChange('pomodoro');
    }
  };

  const handleReset = () => {
    handleCycleEnd();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`pomodoro-timer ${mode}`}>
      <div className="buttons-row">
        <button className={mode=='pomodoro'?`active-btn`:``} onClick={() =>{ if (mode!='pomodoro') handleModeChange('pomodoro')}} >Pomodoro</button>
        <button className={mode=='shortBreak'?`active-btn`:``} onClick={() =>{ if (mode!='shortBreak') handleModeChange('shortBreak')}}>Short Break</button>
        <button className={mode=='longBreak'?`active-btn`:``} onClick={() =>{if (mode!='longBreak')  handleModeChange('longBreak')}}>Long Break</button>
      </div>
      <div className="timer-display">
        {formatTime(time)}
      </div>
      <div className="control-buttons">
        <button onClick={handleStartPause}>
          {isActive && !isPaused ? 'PAUSE' : 'START'}
        </button>
        
          <div className={!isActive?`endBtn hidden`:`endBtn`} onClick={handleReset}>
          <FontAwesomeIcon icon={faForwardStep} />
          </div>
       
      </div>
    </div>
  );
};

export default PomodoroTimer;
