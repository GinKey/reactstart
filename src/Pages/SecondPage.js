import React, {useState} from 'react';
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
            <div className="font-Montserrat">
                <div className="finishMessage">
                    <p style={{marginTop: "185px", width: "534px", height:"98px"}}>
                        Спасибо за прохождение первого сезона!
                    </p>
                    <img style={{position: "absolute", marginTop:"70px", marginLeft: "700px"}} src={vector} alt="лого"/>
                    <img style={{position: "absolute", marginTop:"70px", marginRight: "70%"}} src={vectorLeft} alt="вектор1"/>
                </div>
                <div className="creator">
                    <p  style={{marginTop: "50px", width: "534px", height:"63px"}}>
                        Создатель - Andrey Zharov
                    </p>
                </div>
                <div className="main_text">
                    <p style={{marginTop: "26px", width: "680px"}}>
                        Хотелось бы услышать ваше мнение об этом проекте и идеи для будущих сезонов.
                        Не стесняйтесь оставлять свой отзыв и делиться вашими впечатлениями с нами.
                    </p>
                </div>
                <div className="links" style={{marginTop: "87px"}}>
                    <div>
                        <div>
                            <a href="https://github.com/GinKey">
                            <img src={git_img} alt="Гитхаб лого"/></a>
                            <a style={{marginLeft: "10px"}} href="https://github.com/GinKey">GinKey</a>
                        </div>
                    </div>
                    <div  style={{marginLeft: "107px"}}>
                        <div>
                            <a href="https://t.me/+jRhyW-iKyhA1ZDMy">
                                <img src={tg_img} alt="Телеграмм лого"/></a>
                            <a style={{marginLeft: "10px"}} href="https://t.me/+jRhyW-iKyhA1ZDMy">MindHub</a>
                        </div>
                    </div>
                </div>
                <div className="elli" style={{marginTop: "61px"}}>
                    <p style={{width: "382px"}}>Отдельная благодарность лучшему дизайнеру <span className="ellink">ellink</span></p>
                    <img style={{position: "absolute", marginTop:"-350px", marginLeft: "88%"}} src={vectorBot} alt="вектор2"/>
                </div>
            </div>
        </div>
    );
}


export default SecondPage;
