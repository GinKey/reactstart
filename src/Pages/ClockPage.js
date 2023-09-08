import React, { useState, useEffect, useRef } from 'react';
import '../Components/clock.css';
import '../Components/fonts.css'
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

function Clock() {
    const [time, setTime] = useState(new Date());
    const [arrowsPositioned, setArrowsPositioned] = useState(false);
    const secondsRef = useRef();
    const minutesRef = useRef();
    const hoursRef = useRef();
    const inputRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [attemptsCount, setAttemptsCount] = useState(0); // Добавлено состояние для подсчета попыток
    const history = useNavigate();

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

    const handleButtonClick = () => {
        history("/dino");
    };


    const handleCheckTimeButton = () => {
        const userTime = inputRef.current.value;
        if (isValidTime(userTime)) {
            setAttemptsCount(attemptsCount + 1);
            if (attemptsCount >= 5) {
                setErrorMessage("Вы уже ввели правильное время более 5 раз! Время не ответ, ответ в часах!");
            } else if (attemptsCount >= 3) {
                setErrorMessage("Вы ввели правильное время более 3 раз! но это не ответ!!!");
            } else {
                setErrorMessage("Время верно, но это не ответ(");
            }
        } else {
            setErrorMessage("Неправильное время. Смотрите на часы и следите за направлением.");
        }
    };

    const handleInputChange = () => {
        setErrorMessage("");
    };


    const isValidTime = (time) => {
        // Разбиваем введенное время на часы и минуты
        const [hours, minutes] = time.split(":").map(Number);

        // Получаем текущее время
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        // Сравниваем введенное время с текущим временем
        return hours === currentHours && minutes === currentMinutes;
    };

    return (
        <div className='app' style={{display: "flex", flexDirection: 'column'}}>
            <div className='font-roboto' style={{color: 'white', marginBottom: '60px', fontSize: "20px", marginTop: "-60px"}}>Время - словно компас,
                указывающий путь через моменты и направляющий к истине.</div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <div className={`clock ${arrowsPositioned ? 'show' : ''}`}>
                    <div ref={secondsRef} className="hand seconds"></div>
                    <div ref={minutesRef} className="hand minutes">
                        <div className="arrow"></div>
                        <div className="button" onClick={handleButtonClick}></div>
                    </div>
                    <div ref={hoursRef} className="hand hours"></div>
                    <div className="center-dot"></div>
                </div>
                <div style={{ position: 'relative', marginLeft: "120px", display: 'flex', flexDirection: 'column'}}>
                    <input
                        ref={inputRef}
                        style={{ width: '200px' }}
                        placeholder="Введите время (чч:мм:сс)"
                        onInput={handleInputChange}
                    />
                    <Button className="font-roboto" variant="outline-secondary" onClick={handleCheckTimeButton} style={{marginTop: "5px"}}>Проверить время</Button>
                    {errorMessage && (
                        <div style={{ color: errorMessage.includes("ответ") ? 'green' : 'red', position: 'absolute', top: '100%',
                            textAlign: 'center', marginTop: '5px' }}>{errorMessage}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Clock;
