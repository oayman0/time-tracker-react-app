
import AppNavBar from '../components/AppNavBar';
import PomodoroTimer from '../components/PomodoroTimer';
import Tasks from '../components/Tasks';
// import Hero from '../components/Hero';


function AppPage() {
  return (
    <>
    <AppNavBar/>
      <main>
      <PomodoroTimer/>
      <Tasks/>
      </main>
      
    </>
  );
}

export default AppPage;
