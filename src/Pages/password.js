import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../Components/style.css";
import "../Components/fonts.css";
import background from "../Components/background_dark.png";

const appStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    paddingTop: '37vh',
    boxSizing: 'border-box',
};




function HomePage() {
    const [inputPassword, setInputPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const history = useNavigate();
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (inputPassword === '') {
                history('/labyrinth');
            }
            else if (inputPassword === '1010' || inputPassword === '101010')
            {
                history('/second')
            }
            else {
                setShowErrorMessage(true);
            }
        }
    };

    const handleInputChange = (event) => {
        setInputPassword(event.target.value);
        setShowErrorMessage(false);
    };

    return (
        <div style={appStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

            <div className="input-container" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="font-roboto" style={{ textAlign: 'center' }}>
                        <h1 className="animate-text animate-fadeIn"  style={{ color: 'white', fontSize: '40px'}}>Enter Password:</h1>
                    </div>
                    <div style={{ flex: 1}}>
                        <input
                            type="password"
                            placeholder=""
                            value={inputPassword}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            style={{
                                backgroundColor: 'black',
                                color: 'white',
                                fontSize: '20px',
                                padding: '10px',
                                border: 'none',
                                borderRadius: '5px',
                                outline: 'none',
                                width: '100%',
                            }}
                        />
                    </div>
                </div>
                <div
                    style={{
                        marginTop: '-3px',
                        left: '0',
                        width: '100%',
                        height: '3px',
                        backgroundColor: 'white',
                    }}
                />
            </div>
            {showErrorMessage && (
                <p className="font-roboto" style={{ color: 'red', marginTop: '5px', fontSize: '18px'}}>Для ввода пароля нажмите ENTER</p>
            )}
        </div>
        </div>
    );

}

export default HomePage;
