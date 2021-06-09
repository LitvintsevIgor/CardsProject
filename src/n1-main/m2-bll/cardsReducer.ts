import {Dispatch} from "redux";
import {API, OneCardType} from "../m3-dal/api";
import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";

let initialState = {
    cards: [] as OneCardType[],
    wantAddCard: false,
    packId: '',
    loading: false
}

export const cardsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "CARDS/DELETE-CARD":
            return {...state, cards: state.cards.filter( (c) => c._id !== action.cardId )}
        case "CARDS/SET-LOADING":
            return {...state, loading: action.loading}
        case "CARDS/ADD-NEW-CARD":
            return {...state, cards: [...state.cards, action.card]}
        case "CARDS/SET-PACK-ID":
            return {...state, packId: action.packId}
        case "CARDS/OPEN-POPUP-ADD-CARD":
            return {...state, wantAddCard: action.wantAddCard}
        case "CARDS/SET-CARDS":
            return {...state, cards: action.cards}
        default:
            return state
    }
}

// ACTIONS
const setCards = (cards: OneCardType[]) => ({type: "CARDS/SET-CARDS", cards} as const)
export const openPopUpAddCard = (wantAddCard: boolean) => ({type: 'CARDS/OPEN-POPUP-ADD-CARD', wantAddCard} as const)
export const addNewCard = (card: OneCardType) => ({type: 'CARDS/ADD-NEW-CARD', card} as const)
export const setPackId = (packId: string) => ({type: 'CARDS/SET-PACK-ID', packId} as const)
export const setCardsLoading = (loading: boolean) => ({type: 'CARDS/SET-LOADING', loading} as const)
export const deleteCard = (cardId: string) => ({type: 'CARDS/DELETE-CARD', cardId} as const)

// TYPES
type initialStateType = typeof initialState
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type ActionType = ReturnType<typeof setCards>
    | ReturnType<typeof openPopUpAddCard>
    | ReturnType<typeof setPackId>
    | ReturnType<typeof addNewCard>
    | ReturnType<typeof setCardsLoading>
    | ReturnType<typeof deleteCard>


// THUNKS
export const setCardsThunk = (packId: string) => async (dispatch: Dispatch) => {
    dispatch(setCardsLoading(true))
    await API.setCards(packId)
        .then((res) => {
            dispatch(setCards(res.data.cards))
            dispatch(setCardsLoading(false))
        })
}

export const addCardThunk = (packID: string, question: string, answer: string): ThunkType => async (dispatch) => {
    dispatch(setCardsLoading(true))
    await API.addCard(packID, question, answer)
        .then( (res) => {
            debugger
            dispatch(addNewCard(res.data.newCard))
            dispatch(setCardsThunk(packID))
            dispatch(setCardsLoading(false))
            dispatch(openPopUpAddCard(false))
        } )
}

export const deleteCardThunk = (cardId: string, packID: string): ThunkType => async (dispatch) => {
    dispatch(setCardsLoading(true))
    await API.deleteCard(cardId)
        .then( (res) => {
            dispatch(deleteCard(cardId))
            dispatch(setCardsThunk(packID))
            dispatch(setCardsLoading(false))
        } )
}