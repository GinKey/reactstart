import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Password from "./Pages/password";
import SecondPage from './Pages/SecondPage';
import LabirintPage from './Pages/LabirintPage';
import ClockPage from './Pages/ClockPage';


function App() {
  return (
      <Router >
          <Routes>
              <Route path="/" element={<Password />} />
              <Route path="/labirint" element={<LabirintPage />} />
              <Route path="/clock" element={<ClockPage />} />
              <Route path="/second" element={<SecondPage />} />
          </Routes>
      </Router>
  );
}

export default App;
