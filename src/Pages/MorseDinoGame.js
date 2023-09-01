import React, { useState, useEffect, useRef } from 'react';
import '../Components/MorseDinoGame.css';

const MorseDinoGame = () => {
    const [isGameStarted, setIsGameStarted] = useState(true);
    const [isJumping, setIsJumping] = useState(false);
    const [dinoBottom, setDinoBottom] = useState(0);
    const [obstacleLeft, setObstacleLeft] = useState(1000);
    const [obstacleIndex, setObstacleIndex] = useState(0);
    const [obstacleText, setObstacleText] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const dinoRef = useRef(null);
    const obstacleRef = useRef(null);

    const jump = () => {
        if (!isJumping && !gameOver) {
            setIsJumping(true);
            setDinoBottom(dinoBottom + 100);
            setTimeout(() => {
                setDinoBottom(dinoBottom);
                setIsJumping(false);
            }, 400);
        }
    };

    const morseTexts = ['-.', '.', '.--.', '.-.', '-.--', '--.', '.-', '.---'];

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 32) {
                jump();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const obstacle = obstacleRef.current;

        const initialIndex = obstacleIndex % morseTexts.length;
        setObstacleText(morseTexts[initialIndex]);
        obstacle.style.animation = 'moveObstacle 2s linear infinite';

        const handleAnimationEnd = () => {
            const newIndex = (obstacleIndex + 1) % morseTexts.length;
            setObstacleIndex(newIndex);
            setObstacleText(morseTexts[newIndex]);
        };

        obstacle.addEventListener('animationiteration', handleAnimationEnd);

        return () => {
            obstacle.removeEventListener('animationiteration', handleAnimationEnd);
        };
    }, [obstacleIndex, morseTexts]);

    const checkCollision = () => {
        const dino = dinoRef.current;
        const obstacle = obstacleRef.current;

        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            dinoRect.left < obstacleRect.left + obstacleRect.width &&
            dinoRect.left + dinoRect.width > obstacleRect.left &&
            dinoRect.top < obstacleRect.top + obstacleRect.height &&
            dinoRect.top + dinoRect.height > obstacleRect.top
        ) {
            setGameOver(true);
            obstacle.style.animation = 'none';
            window.alert('Игра завершена. Вы столкнулись с препятствием.');
            window.location.reload();
        }
    };

    const updateGame = () => {
        if (!gameOver) {
            setObstacleLeft((prevLeft) => prevLeft - 5);
            checkCollision();
        }

        if (obstacleLeft < -100) {
            setObstacleLeft(1000);
        }

        setTimeout(() => {
            requestAnimationFrame(updateGame);
        }, 1000 / 60); // 60 FPS
    };

    useEffect(() => {
        requestAnimationFrame(updateGame);
    }, [gameOver]);

    return (
        <div className="MorseDinoGame">
            <div className="game-container">
                <div
                    className={`dino ${isJumping ? 'jump' : ''}`}
                    style={{ bottom: dinoBottom }}
                    ref={dinoRef}
                />
                <div
                    id="obstacle"
                    className={`obstacle ${gameOver ? 'game-over' : ''}`}
                    style={{ left: obstacleLeft }}
                    ref={obstacleRef}
                >
                    {obstacleText}
                </div>
                <div className="ground" />
            </div>
        </div>
    );
};



export default MorseDinoGame;
