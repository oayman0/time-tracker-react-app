// ModeContext.js
import React, { createContext, useState, useContext } from 'react';

const ModeContext = createContext();
const ModeUpdateContext = createContext();

export const useMode = () => {
  return useContext(ModeContext);
};

export const useSetMode = () => {
  return useContext(ModeUpdateContext);
};

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('pomodoro');

  return (
    <ModeContext.Provider value={mode}>
      <ModeUpdateContext.Provider value={setMode}>
        {children}
      </ModeUpdateContext.Provider>
    </ModeContext.Provider>
  );
};
