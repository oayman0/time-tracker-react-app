import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import startPauseSound from '../assets/audio/click.mp3';
import cycleEndSound from '../assets/audio/end.mp3';
import buttonClickSound from '../assets/audio/switch.mp3';
import { useMode, useSetMode } from '../contexts/ModeContext';

const PomodoroTimer = ({mode, setMode}) => {
  // const [mode, setMode] = useState('pomodoro');
   // Modes: 'pomodoro', 'shortBreak', 'longBreak'
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const cycleEndAudioRef = useRef(null); // Reference to the cycle end audio element
  const startPauseAudioRef = useRef(null); // Reference to the start/pause audio element
  const buttonClickAudioRef = useRef(null); // Reference to the button click audio element

  // Load state from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('mode');
    const savedTime = localStorage.getItem('time');
    const savedIsActive = localStorage.getItem('isActive');
    const savedIsPaused = localStorage.getItem('isPaused');
    const savedLastUpdate = localStorage.getItem('lastUpdate');

    if (savedMode) setMode(savedMode);
    if (savedTime) {
      const remainingTime = parseInt(savedTime, 10);
      if (savedLastUpdate && savedIsActive === 'true' && savedIsPaused === 'false') {
        const elapsed = Math.floor((Date.now() - parseInt(savedLastUpdate, 10)) / 1000);
        setTime(Math.max(remainingTime - elapsed, 0));
      } else {
        setTime(remainingTime);
      }
    }
    if (savedIsActive) setIsActive(savedIsActive === 'true');
    if (savedIsPaused) setIsPaused(savedIsPaused === 'true');
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mode', mode);
    localStorage.setItem('time', time);
    localStorage.setItem('isActive', isActive);
    localStorage.setItem('isPaused', isPaused);
    localStorage.setItem('lastUpdate', Date.now());
  }, [mode, time, isActive, isPaused]);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => (time > 0 ? time - 1 : 0));
      }, 1000);
    }

    if (time === 0) {
      handleCycleEnd();
    }

    return () => clearInterval(interval); // Ensure interval is cleared on cleanup
  }, [isActive, isPaused, time]);

  const handleModeChange = (newMode, playSound = true) => {
    if (playSound) {
      playButtonClickSound();
    }
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

    if (startPauseAudioRef.current) {
      startPauseAudioRef.current.play();
    }
  };

  const handleCycleEnd = () => {
    console.log("Cycle ended"); // Debug log to check if function is triggered
    if (cycleEndAudioRef.current) {
      cycleEndAudioRef.current.play().catch(error => console.error('Audio play error:', error));
    }

    if (mode === 'pomodoro') {
      handleModeChange('shortBreak', false); // Avoid playing button click sound
    } else if (mode === 'shortBreak' || mode === 'longBreak') {
      handleModeChange('pomodoro', false); // Avoid playing button click sound
    }
  };

  const handleReset = () => {
    handleCycleEnd();
  };

  const playButtonClickSound = () => {
    if (buttonClickAudioRef.current) {
      buttonClickAudioRef.current.play().catch(error => console.error('Audio play error:', error));
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`pomodoro-timer ${mode}`}>
      <div className="buttons-row">
        <button className={mode === 'pomodoro' ? 'active-btn' : ''} onClick={() => { if (mode !== 'pomodoro') handleModeChange('pomodoro'); }}>Pomodoro</button>
        <button className={mode === 'shortBreak' ? 'active-btn' : ''} onClick={() => { if (mode !== 'shortBreak') handleModeChange('shortBreak'); }}>Short Break</button>
        <button className={mode === 'longBreak' ? 'active-btn' : ''} onClick={() => { if (mode !== 'longBreak') handleModeChange('longBreak'); }}>Long Break</button>
      </div>
      <div className="timer-display">
        {formatTime(time)}
      </div>
      <div className="control-buttons">
        <button onClick={handleStartPause}>
          {isActive && !isPaused ? 'PAUSE' : 'START'}
        </button>
        <div className={!isActive ? 'endBtn hidden' : 'endBtn'} onClick={handleReset}>
          <FontAwesomeIcon icon={faForwardStep} />
        </div>
      </div>
      <audio ref={cycleEndAudioRef} src={cycleEndSound} preload="auto" />
      <audio ref={startPauseAudioRef} src={startPauseSound} preload="auto" />
      <audio ref={buttonClickAudioRef} src={buttonClickSound} preload="auto" />
    </div>
  );
};

export default PomodoroTimer;
