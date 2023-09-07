import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Password from "./Pages/password";
import SecondPage from './Pages/SecondPage';
import LabyrinthPage from './Pages/LabyrinthPage';
import ClockPage from './Pages/ClockPage';
import MorseDinoGame from './Pages/MorseDinoGame';
import PageFive from "./Pages/PageFive";
import {useEffect, useState} from "react";

function App() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Проверяем userAgent для определения типа устройства
        const userAgent = navigator.userAgent.toLowerCase();

        if (
            userAgent.includes('android') ||
            userAgent.includes('iphone') ||
            userAgent.includes('ipad')
        ) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    return (
        <Router>
            <Routes>
                {isMobile ? (
                    <Route
                        path="/"
                        element={
                            <div className="phoneApp">
                                <p>
                                    Зайдите через компьютер по этой ссылке: <a href="https://reactstart-zeta.vercel.app">https://reactstart-zeta.vercel.app</a>
                                </p>
                            </div>
                        }
                    />
                ) : (
                    <>
                        <Route path="/" element={<Password />} />
                        <Route path="/labyrinth" element={<LabyrinthPage />} />
                        <Route path="/clock" element={<ClockPage />} />
                        <Route path="/dino" element={<MorseDinoGame />} />
                        <Route path="/second" element={<SecondPage />} />
                        <Route path="/pagefive" element={<PageFive />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
