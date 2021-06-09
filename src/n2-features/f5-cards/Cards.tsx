import React from 'react';
import {SuperInputText} from "../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import {OneCardType} from "../../n1-main/m3-dal/api";
import {PopUp} from "../../n1-main/m1-ui/common/utills/modal-popUp/PopUp";
import {deleteCardThunk, openPopUpAddCard} from "../../n1-main/m2-bll/cardsReducer";



export const Cards = () => {

    // HOOKS
    const cards = useSelector<RootReducerType, OneCardType[]>(state => state.cards.cards)
    const openPopUp = useSelector<RootReducerType, boolean>(state => state.cards.wantAddCard)
    const dispatch = useDispatch()
    const loading = useSelector<RootReducerType, boolean>(state => state.cards.loading)
    // HANDLERS
    const handleAddNewCard = () => {
        dispatch(openPopUpAddCard(true))
    }
    const handleClosePopUp = () => {
        dispatch(openPopUpAddCard(false))
    }
    const handleDeleteCard = (cardId: string, packId: string) => {
        dispatch(deleteCardThunk(cardId, packId))
    }

    return (

        <div>
            <h1>Pack Name</h1>
            <div>
                <SuperInputText placeholder={"search"} />
                <SuperButton onClick={handleAddNewCard} >Add new card</SuperButton>
                { loading && <div>Loading...</div>}
                {
                    openPopUp && <PopUp setServerErrorCallback={handleClosePopUp}
                                        textForPlaceholder={"Question"}
                                        popUpTitle={'Card info'}
                                        textForAnswerPlaceholder={'Answer'}
                                        textForQuestionPlaceholder={'Question'}
                    />
                }
            </div>
            <div>
                {
                    cards.map( (card) => {
                        return (
                            <div>
                                <div>
                                    {card.question}
                                </div>
                                <div>
                                    {card.answer}
                                </div>
                                <div>
                                    {card.updated}
                                </div>
                                <div>
                                    {card.grade}
                                </div>
                                <div>
                                    <button onClick={ () => handleDeleteCard(card._id, card.cardsPack_id)} >delete</button>
                                </div>
                                <div>
                                    <button>edit</button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}