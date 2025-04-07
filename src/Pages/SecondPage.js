import React from 'react';
import '../Components/style2.css'
import '../Components/fonts.css'
import git_img from '../Components/final_page_icons/git_img.svg'
import tg_img from '../Components/final_page_icons/telegram_img.svg'
import vector from  '../Components/final_page_icons/Vector.svg'
import vectorBot from  '../Components/final_page_icons/Vector_bot.svg'
import vectorLeft from  '../Components/final_page_icons/Vector_left.svg'


function SecondPage() {
    return (
        <div className="app">
            <audio autoPlay loop>
                <source src="/audio/background.mp3" type="audio/mpeg" />
            </audio>
            <div className="font-Montserrat">
                <div className="finishMessage">
                    <p style={{marginTop: "185px", width: "534px", height:"98px"}}>
                        Спасибо за прохождение!
                    </p>
                    <img style={{position: "absolute", marginTop:"70px", marginLeft: "700px"}} src={vector} alt="лого"/>
                    <img className="hide-on-small-screen" style={{position: "absolute", marginTop:"70px", marginRight: "65%"}} src={vectorLeft} alt="вектор1"/>
                </div>
                <div className="creator">
                    <p  style={{width: "534px", height:"63px"}}>
                        Создатель - Andrey Zharov
                    </p>
                </div>
                <div className="main_text">
                    <p style={{marginTop: "26px", width: "680px"}}>
                        Хотелось бы услышать ваше мнение об этом проекте!
                        <br></br>
                        Не стесняйтесь оставлять свой отзыв и делиться вашими впечатлениями.
                    </p>
                </div>
                <div className="links" style={{marginTop: "100px"}}>
                    <div>
                        <div>
                            <a href="https://github.com/GinKey">
                            <img src={git_img} alt="Гитхаб лого"/></a>
                            <a style={{marginLeft: "10px"}} href="https://github.com/GinKey">GinKey</a>
                        </div>
                    </div>
                    <div  style={{marginLeft: "107px"}}>
                        <div>
                            <a href="https://t.me/MindHubb">
                                <img src={tg_img} alt="Телеграмм лого"/></a>
                            <a style={{marginLeft: "10px"}} href="https://t.me/MindHubb">MindHub</a>
                        </div>
                    </div>
                </div>
                <div className="elli" style={{marginTop: "61px"}}>
                    <img className="hide-on-small-screen2" style={{position: "absolute", marginTop:"-350px", marginLeft: "88%"}} src={vectorBot} alt="вектор2"/>
                </div>
            </div>
        </div>
    );
}


export default SecondPage;
