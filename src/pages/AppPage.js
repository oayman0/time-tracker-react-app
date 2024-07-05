import React, { useState } from 'react';
import AppNavBar from '../components/AppNavBar';
import PomodoroTimer from '../components/PomodoroTimer';
import SimpleNavBar from '../components/SimpleNavBar';
import Tasks from '../components/Tasks';
// import Hero from '../components/Hero';


function AppPage() {

  const [mode, setMode] = useState('pomodoro');

  return (
    <>
    <SimpleNavBar/>
    {/* <AppNavBar/> */}
      <main>
      <PomodoroTimer mode={mode} setMode={setMode}/>
      <Tasks mode={mode} setMode={setMode}/>
      </main>

    </>
  );
}

export default AppPage;
