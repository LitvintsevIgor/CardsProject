import {Dispatch} from "redux";
import {API, OneCardType} from "../m3-dal/api";

let initialState = {
    cards: [] as OneCardType[],
}

export const cardsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state, cards: action.cards}
        default:
            return state
    }
}

// ACTIONS
const setCards = (cards: OneCardType[]) => ({type: "CARDS/SET-CARDS", cards} as const)

// TYPES
type initialStateType = typeof initialState
type ActionType = ReturnType<typeof setCards>


// THUNKS

export const setCardsThunk = (packId: string) => async (dispatch: Dispatch) => {
    await API.setCards(packId)
        .then((res) => {
            dispatch(setCards(res.data.cards))
        })
}