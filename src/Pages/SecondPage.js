import React, {useState} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../Components/element'; // Путь к файлу с константой ItemTypes
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../Components/style2.css'

function SecondPage() {
    const [cardList, setCardList] = useState([
        {id: 1, order: 1, text: 'Карточка 1'},
        {id: 2, order: 2, text: 'Карточка 2'},
        {id: 3, order: 3, text: 'Карточка 3'},
        {id: 4, order: 4, text: 'Карточка 4'},
    ])

    const [currentCard, setCurrentCard] = useState(null)

    function dragStartHandler(e, card) {
        setCurrentCard(card)
        
    }

    function dragEndHandler(e) {
        e.target.style.background = 'white'

    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = 'lightgray'
        
    }

    function dropHandler(e, card) {
        e.preventDefault()
        setCardList(cardList.sort(sortCards).map(c =>
        {
            if(c.id === card.id){
                return {...c, order: currentCard.order}
            }
            if(c.id === currentCard.id){
                return {...c, order: card.order}
            }
            return c
        }))
        e.target.style.background = 'white'


    }

    const sortCards = (a, b) => {
        if (a.order > b.order){
            return 1
        }else {
            return -1
        }
    }

    return (
        <div className={'app'}>
            {cardList.map(card =>
                <div
                    onDragStart={(e) => dragStartHandler(e, card)}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, card)}
                    draggable={true}
                    className={'card'}>
                    {card.text}
                </div>
            )}

        </div>
    );
}


export default SecondPage;
