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
        calculateArrowPositions();

        return () => {
            clearInterval(timerID);
        };
    }, []);

    return (
        <div className='app' style={{flexDirection: 'column'}}>
            <div style={{color: 'white', marginBottom: '60px', fontSize: "20px", marginTop: "-60px"}}>Время - словно компас,
                указывающий путь через моменты и направляющий к истине.</div>
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
