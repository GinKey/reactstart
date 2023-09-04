import React from 'react';
import { useNavigate} from 'react-router-dom';
import "../Components/pagefive.css"
import Button from "react-bootstrap/Button";

function PageFive() {
    const history = useNavigate();

    const navigateToHome = () => {
        history('/');
    };

    return (
        <div className="MyPage">
            <div className="hiddenText blackText">Вернись к воспоминаниям, найди связь в прошлом...</div>
            <div className="hiddenText whiteText">...и ключ станет ясным. (Всё связано)</div>
            <div className="half blackHalf">1</div>
            <div className="half whiteHalf">0</div>
            <div className="grayBox">
                <Button variant="outline-secondary" onClick={navigateToHome}>Вернуться на главную</Button>
            </div>
        </div>
    );
}

export default PageFive;
