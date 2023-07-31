import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Password from "./Pages/password";
import SecondPage from './Pages/SecondPage';
import LabirintPage from './Pages/LabirintPage';
function App() {
  return (
      <Router >
          <Routes>
              <Route path="/" element={<Password />} />
              <Route path="/labirint" element={<LabirintPage />} />
              <Route path="/second" element={<SecondPage />} />
          </Routes>
      </Router>
  );
}

export default App;
