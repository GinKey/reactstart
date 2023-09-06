import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Password from "./Pages/password";
import SecondPage from './Pages/SecondPage';
import LabyrinthPage from './Pages/LabyrinthPage';
import ClockPage from './Pages/ClockPage';
import MorseDinoGame from './Pages/MorseDinoGame';
import PageFive from "./Pages/PageFive";




function App() {
  return (
      <Router >
          <Routes>
              <Route path="/" element={<Password />} />
              <Route path="/labyrinth" element={<LabyrinthPage />} />
              <Route path="/clock" element={<ClockPage />} />
              <Route path="/dino" element={<MorseDinoGame />} />
              <Route path="/second" element={<SecondPage />} />
              <Route path="/pagefive" element={<PageFive />} />
          </Routes>
      </Router>
  );
}

export default App;
