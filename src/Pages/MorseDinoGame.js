import React, { useState, useEffect, useRef } from 'react';
import '../Components/MorseDinoGame.css';
import {useNavigate} from "react-router-dom";
import '../Components/fonts.css'
import ReactModal from 'react-modal';
import Button from "react-bootstrap/Button";


const MorseDinoGame = () => {
    const [isGameStarted, setIsGameStarted] = useState(true);
    const [isJumping, setIsJumping] = useState(false);
    const [dinoBottom, setDinoBottom] = useState(0);
    const [obstacleLeft, setObstacleLeft] = useState(1000);
    const [obstacleIndex, setObstacleIndex] = useState(0);
    const [obstacleText, setObstacleText] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [hasJumped, setHasJumped] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);
    const dinoRef = useRef(null);
    const obstacleRef = useRef(null);
    const history = useNavigate();
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const jump = () => {
        if (!isJumping && !gameOver) {
            setIsJumping(true);
            setDinoBottom(dinoBottom + 100);
            setIsSpacePressed(true); // Показать затемнение при прыжке
            setTimeout(() => {
                setDinoBottom(dinoBottom);
                setIsJumping(false);
                setIsSpacePressed(false); // Показать затемнение при прыжке
            }, 400);
            setHasJumped(true);
        }
    };

    const morseTexts = ['_ .', '.', '. _ _ .', '. _ .', '_ . _ _', '_ _ .', '. _', '. _ _ _',
        '_ .', '.', '. _ _ .', '. _ .', '_ . _ _', '_ _ .', '. _', '. _ _ _',
        '_ .', '.', '. _ _ .', '. _ .', '_ . _ _', '_ _ .', '. _', '. _ _ _'];

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 32) {
                jump();
                localStorage.setItem('jumpedOnce', 'true');
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

        obstacle.style.animation = 'moveObstacle 2.5s linear infinite';

        const handleAnimationEnd = () => {
            const newIndex = (obstacleIndex + 1) % morseTexts.length;
            setObstacleIndex(newIndex);
            setObstacleText(morseTexts[newIndex]);
            setCompletedCount((count) => count + 1); // Увеличиваем счетчик завершенных элементов
        };

        obstacle.addEventListener('animationiteration', handleAnimationEnd);

        return () => {
            obstacle.removeEventListener('animationiteration', handleAnimationEnd);
        };
    }, [obstacleIndex, morseTexts]);

    const checkCollision = () => {
        const dino = dinoRef.current;
        const obstacle = obstacleRef.current;

        if (dino && obstacle) { // Проверяем, что элементы существуют
            const dinoRect = dino.getBoundingClientRect();
            const obstacleRect = obstacle.getBoundingClientRect();

            const jumpedOnce = localStorage.getItem('jumpedOnce') === 'true';

            if (
                (jumpedOnce || isJumping) &&
                dinoRect.left < obstacleRect.left + obstacleRect.width &&
                dinoRect.left + dinoRect.width > obstacleRect.left &&
                dinoRect.top < obstacleRect.top + obstacleRect.height &&
                dinoRect.top + dinoRect.height > obstacleRect.top
            ) {
                setGameOver(true);
                obstacle.style.animation = 'none';
                localStorage.removeItem('jumpedOnce');
                setIsModalOpen(true);
            }
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
        }, 1000 / 60);
    };

    useEffect(() => {
        if (completedCount === morseTexts.length && !hasJumped) {

            history("/second")
        }
    }, [completedCount, hasJumped, morseTexts.length, history]);


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
                <div className={`controls ${isSpacePressed ? 'space-pressed' : ''}`}>
                    <div className="controls-text">
                       <span className="font-roboto">SPACE - прыжок</span>
                    </div>
                </div>
            </div>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Game Over Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 className="font-roboto">Игра завершена</h2>
                <p className="font-roboto">Вы столкнулись с препятствием.</p>
                <Button className="font-roboto" variant="secondary" onClick={() => window.location.reload()}>перезапуск</Button>
            </ReactModal>
        </div>
    );
};

export default MorseDinoGame;
