import React, { useState, useEffect, useRef } from 'react';
import '../Components/clock.css';

function Clock() {
    const [time, setTime] = useState(new Date());
    const [arrowsPositioned, setArrowsPositioned] = useState(false);
    const secondsRef = useRef();
    const minutesRef = useRef();
    const hoursRef = useRef();

    useEffect(() => {
        const calculateArrowPositions = () => {
            const currentTime = new Date();
            const seconds = currentTime.getSeconds();
            const minutes = currentTime.getMinutes();
            const hours = currentTime.getHours();

            const secondsRotation = (seconds / 60) * 360;
            const minutesRotation = (minutes / 60) * 360;
            const hoursRotation = (hours % 12) * 30 + (minutes / 60) * 30;

            secondsRef.current.style.transform = `translate(-50%, -50%) rotate(${secondsRotation}deg)`;
            minutesRef.current.style.transform = `translate(-50%, -50%) rotate(${minutesRotation}deg)`;
            hoursRef.current.style.transform = `translate(-50%, -50%) rotate(${hoursRotation}deg)`;

            setArrowsPositioned(true);
            setTime(currentTime);
        };

        const timerID = setInterval(calculateArrowPositions, 1000);
        calculateArrowPositions(); // Вызываем сразу для начального позиционирования

        return () => {
            clearInterval(timerID);
        };
    }, []);

    return (
        <div className="app">
            <div className={`clock ${arrowsPositioned ? 'show' : ''}`}>
                <div ref={secondsRef} className="hand seconds"></div>
                <div ref={minutesRef} className="hand minutes">
                    <div className="arrow"></div>
                </div>
                <div ref={hoursRef} className="hand hours"></div>
                <div className="center-dot"></div>
            </div>
        </div>
    );
}

export default Clock;
