import React from 'react';
import { useNavigate} from 'react-router-dom';
import "../Components/pagefive.css"
import Button from "react-bootstrap/Button";
import blackhint from "../Components/Black_hint.svg";
import "../Components/hint.css"

function PageFive() {
    const history = useNavigate();

    const navigateToHome = () => {
        history('/');
    };

    return (
        <div className="MyPage">
            <div>
                <a href="https://t.me/MindHubb/12" className="tooltip-icon">
                    <img style={{position: "fixed", top: "20px", right: "20px", width: "50px", height: "50px"}} src={blackhint} alt="пятая подсказка"/>
                    <span className="tooltip-text">Воспользоваться подсказкой</span>
                </a>
            </div>
            <div className="hiddenText blackText">Вернитесь к воспоминаниям, обнаружьте связь во всех испытаниях...</div>
            <div className="hiddenText whiteText">...и пароль к разгадке станет ясным. (Всё связано)</div>
            <div className="half blackHalf">1</div>
            <div className="half whiteHalf">0</div>
            <div className="grayBox">
                <Button variant="outline-secondary" onClick={navigateToHome}>Вернуться на главную</Button>
            </div>
        </div>
    );
}

export default PageFive;
