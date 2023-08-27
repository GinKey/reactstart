import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import '../Components/labirint.css'
import "../Components/fonts.css";





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



function LabirintPage() {
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
                alert('Ты думал будет все так просто)');
                window.location.reload();
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
                background: 'black',
                margin: 0,
                padding: 0,
            }}
        >
            <div className="maze" style={{ marginTop: '40px' }}>
            {maze.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, cellIndex) => (
                        <span className='font-roboto_mono'
                            key={cellIndex}
                            style={{
                                width: '16px',
                                height: '24px',
                                display: 'inline-block',
                                fontSize: '20px',
                                textAlign: 'center',
                                color: cell === finishChar ? 'red' : 'white',
                            }}
                        >
                            {cell === finishChar ? <span role="img" aria-label="Finish">{finishChar}</span> : cell}
                        </span>
                    ))}
                </div>
            ))}
        </div>
            <div className="instructions" style={{ color: 'white', textAlign: 'center' }}>
                <p style={{ marginTop: '50px'}}>Управление:</p>
                <p style={{ fontSize: '24px', margin: '-10px 0' }}>↑</p>
                <p style={{ fontSize: '24px', margin: '-10px 0' }}>← ↓ →</p>
            </div>
    </div>
    );
}

export default LabirintPage;
