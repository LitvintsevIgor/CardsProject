import React, {ChangeEvent, useState} from "react";
import s from "./Modal.module.scss"
import {SuperInputText} from "../../SuperInput/SuperInputText";
import {SuperButton} from "../../SuperButton/SuperButton";
import {addPackThunk} from "../../../../m2-bll/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../m2-bll/store";
import {addCardThunk} from "../../../../m2-bll/cardsReducer";

type PopUpProps = {
    setServerErrorCallback: (text: string | null) => void
    text?: string | null
    textForPlaceholder?: string
    popUpTitle?: string
    textForAnswerPlaceholder?: string
    textForQuestionPlaceholder?: string
}

export const PopUp: React.FC<PopUpProps> = (
    {
        setServerErrorCallback,
        text,
        textForPlaceholder,
        popUpTitle,
        textForAnswerPlaceholder,
        textForQuestionPlaceholder
    }) => {

    // HOOKS
    const [packName, setPackName] = useState('')
    const dispatch = useDispatch()
    const addPack = useSelector<RootReducerType, boolean>(state => state.packs.wantToAddPack)
    const addCard = useSelector<RootReducerType, boolean>(state => state.cards.wantAddCard)
    const packsLoading = useSelector<RootReducerType, boolean>(state => state.packs.loading)
    const cardsLoading = useSelector<RootReducerType, boolean>(state => state.cards.loading)
    const packId = useSelector<RootReducerType, string>(state => state.cards.packId)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    // HANDLERS
    const onClickHandler = () => {
        setServerErrorCallback(null)
    }
    const onChangePackTitleText = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    const handleAddPack = () => {
        dispatch(addPackThunk(packName))
        setPackName('')
    }
    const handleAddCard = () => {
        dispatch(addCardThunk(packId, question, answer))
    }

    const onChangeQuestionText = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswerText = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    return (
        <div className={s.modalBox}>
            <div className={s.content}>
                {(packsLoading || cardsLoading) && <div>Loading ...</div>}

                {!(addPack || addCard)
                    ? <p>{text}</p> :
                    <div>
                        <h1>{popUpTitle}</h1>
                        {
                            addPack
                                ? <div>
                                    <SuperInputText placeholder={textForPlaceholder}
                                                    value={packName}
                                                    onChange={onChangePackTitleText}
                                    />
                                    <SuperButton className={s.saveBtn} onClick={handleAddPack}>Save</SuperButton>
                                </div>

                                : <div>
                                    <div>
                                        <SuperInputText placeholder={textForQuestionPlaceholder}
                                                        value={question}
                                                        onChange={onChangeQuestionText}
                                        />
                                    </div>
                                <div>
                                    <SuperInputText placeholder={textForAnswerPlaceholder}
                                                    value={answer}
                                                    onChange={onChangeAnswerText}
                                    />
                                </div>
                                    <SuperButton className={s.saveBtn} onClick={handleAddCard}>Save</SuperButton>
                                </div>
                        }
                    </div>
                }
                <button onClick={onClickHandler}>close</button>
            </div>
        </div>
    )
}