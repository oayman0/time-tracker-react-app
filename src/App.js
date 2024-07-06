import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage'
import LandingPage from "./pages/LandingPage";
import AppPage from "./pages/AppPage";



function App() {
  return (
    <Router>

    <Routes>
      <Route exact path='/' element={<LandingPage />}/>
      {/* <Route exact path='/app' element={< AppPage />}/> */}
      <Route path='/app' element={< AppPage />}/>
      <Route path='*' element={< NotFoundPage />} />
      {/* 404 NOT FOUND route - no 'path' */}
    </Routes>

  </Router>
  );
}

export default App;
