import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import '../Components/labirint.css'
import "../Components/fonts.css";
import Button from 'react-bootstrap/Button';






const customMaze = [
    " ▄▄▄▄▄▄▄ ▄   ▄▄ ▄ ▄▄ ▄▄ ▄ ▄  ▄▄ ▄  ▄▄▄▄▄▄▄",
    " █ ▄▄▄ █ ▀█▀▀▄ ▄█▀ ▄▄  ▄█  ▀█▄ ▄▀  █ ▄▄▄ █",
    " █ ███ █ ▄ ▄▄██ █▀▄▀▀██ ▄▀ ▀ ██ ▄▀ █ ███ █",
    " █▄▄▄▄▄█ █ ▄ █ ▄▀█ ▄▀▄ ▄▀▄ █▀▄ ▄▀▄ █▄▄▄▄▄█",
    " ▄▄▄  ▄▄ ██▄█ ▀▄▀▀█ ▄▄▀▄▄ █▀▄ ▀▄█ ▄▄▄▄  ▄▄",
    " █▄█▄█▀▄▀▀▀▀▄▀▄▀▀▄▄█  ▄▀▀▄▄█ █▀▀▀▄█ ██▄▄▀ ",
    " ██▄▀▄▀▄█ ▄▀▄▄█▀▄ ▀▄▄ █ ▄▄▀▄▄ █ ▄▄███▄ ▀▀█",
    "  ▀█ █ ▄█▀█▀ █▄█▀▄▄█ █▄▀█▄▄█ ███  ▄█ █ ▄▀ ",
    " ▀ ▀▀▀ ▄█ █ ▀██ ▄ ██  █▀ ▀▀▄▄██ ▄ ▄   ▄█▄ ",
    " ▀ ▄▄▄▄▄▀█ ██▄▄█ █ ▄ █▄█ █▀██▄▄█ ███▄█▀█▄ ",
    " ██ ▀▄▀▄ ██▀▄███▄ █▀█▄▀▄▄▄█▀  ▀▄▄    ▄▀██▄",
    " █ ▄▀▀█▄▀▀ ▄▄▄▄▄ ███  ▄█  ▄█▀▄▄█ ██▄▀█▄ █ ",
    "  ▄▀█▀ ▄ ▀▄▄▄▀▀▄█▄█ ▄▄▀▄▄▄█ ▄ ▀▄▀█▄▄ ▄▀█▄▄",
    " ▄▄▀▄ ▀▄█▄██▀▄▄██ ▄█ ⚑ ██▄▄█▀▄█▀█▄▄█▀▀▄▄▀ ",
    "  █ █  ▄ ▄ ▀▄ █ █ ▀▄▄ █ ▀▀▀▄▄  ▄█ ▄    ▀▄▄",
    " ▄▄ █ █▄█▄ █▀▄ ▀▀▄▄█ █▀█ █▄█ ▀  ▀▄██▄█▄▄▀ ",
    " ▄▄█ ▄█▄▄  █▄ █▀▄ ▀▄▄ █▀█ ▀▄▄ █▀▄▄▄▄▄▄ ▀▀▄",
    " ▄▄▄▄▄▄▄ ▀▀█ █▄█▀▄▄█ █▄█▀▄▄█ ▀▄█▀█ ▄ ██▀▄█",
    " █ ▄▄▄ █ ▀▄ ▄ ▀▄▄  ▄▄▄▀▄▄▄█  ██  █▄▄▄█▀█  ",
    " █ ███ █ ▄▀  ▀▄█ █▄▄█▄▄█  ▄▀  ▄█▄▄▀██▀█▀▄ ",
    " █▄▄▄▄▄█ █▄ ▄▀▀▄▄ █ ▄ ▀▄▄ █ ▄ ▀▄▀ ▀▀▄▄▀█ ▄",
];

const mazeHeight = customMaze.length;
const mazeWidth = customMaze[0].length;
const playerChar = '🚀';
const finishChar = '⚑';

function LabyrinthPage() {

    const PopupModal = () => {
        const closePopup = () => {
            setShowPopup(false);
            window.location.reload();

        };

        return (
            <div className={`popup-modal ${showPopup ? 'open' : ''}`}>
                <div className="popup-content">
                    <p className="font-roboto">
                        Поздравляю! Вы покорили лабиринт! 🚀
                        <br />
                        Великие путешествия начинаются там, где заканчиваются границы.
                    </p>
                    <Button className="font-roboto" variant="secondary" onClick={closePopup}>перезапуск</Button>
                </div>
            </div>
        );
    };

    const [showPopup, setShowPopup] = useState(false);
    const [maze, setMaze] = useState(customMaze.map(row => row.split('')));
    const [playerPos, setPlayerPos] = useState([1, 2]);

    const history = useNavigate();
    const handleKeyPress = (e) => {
        const newPlayerPos = [...playerPos];
        switch (e.key) {
            case 'ArrowUp':
                newPlayerPos[0] = Math.max(0, playerPos[0] - 1);
                break;
            case 'ArrowDown':
                newPlayerPos[0] = Math.min(mazeHeight - 1, playerPos[0] + 1);
                break;
            case 'ArrowLeft':
                newPlayerPos[1] = Math.max(0, playerPos[1] - 1);
                break;
            case 'ArrowRight':
                newPlayerPos[1] = Math.min(mazeWidth - 1, playerPos[1] + 1);
                break;
            default:
                return;
        }

        if (maze[newPlayerPos[0]][newPlayerPos[1]] !== '█') {
            const newMaze = maze.map(row => [...row]);
            newMaze[playerPos[0]][playerPos[1]] = ' ';
            newMaze[newPlayerPos[0]][newPlayerPos[1]] = playerChar;
            setMaze(newMaze);
            setPlayerPos(newPlayerPos);

            if (newPlayerPos[0] === 1 && newPlayerPos[1] === 0) {
                history('/clock');
            }

            if (maze[newPlayerPos[0]][newPlayerPos[1]] === finishChar) {
                setShowPopup(true);
            }
        }
    }

    useEffect(() => {
        const newMaze = maze.map(row => [...row]);
        newMaze[playerPos[0]][playerPos[1]] = playerChar;
        setMaze(newMaze);

        document.querySelector('.maze-page').focus();

    }, []);

    return (
        <div
            className="maze-page"
            tabIndex="0"
            onKeyDown={handleKeyPress}
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                background: '#FFFAFA',
            }}
        >
            <div className="maze" style={{ marginTop: '40px'}}>
            {maze.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex'}}>
                    {row.map((cell, cellIndex) => (
                        <span className='font-roboto_mono'
                            key={cellIndex}
                            style={{
                                margin: '-3px',
                                padding: '-3px',
                                width: '18px',
                                height: '26px',
                                display: 'inline-block',
                                textAlign: 'center',
                                color: cell === finishChar ? 'red' : '',
                                fontSize: '20px',
                                zIndex: cell === playerChar ? 2 : 1,
                            }}
                        >
                            {cell === finishChar ? <span role="img" aria-label="Finish">{finishChar}</span> : cell}
                        </span>
                    ))}
                </div>
            ))}
        </div>
            <div className="font-roboto" style={{ color: '', textAlign: 'center' }}>
                <p style={{ marginTop: '20px'}}>Управление:</p>
                <p style={{ fontSize: '24px', margin: '-10px 0' }}>↑</p>
                <p style={{ fontSize: '24px', margin: '-10px 0' }}>← ↓ →</p>
            </div>
            <PopupModal />
    </div>
    );
}

export default LabyrinthPage;
