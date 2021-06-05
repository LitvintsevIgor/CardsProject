import {Dispatch} from "redux";
import {API} from "../m3-dal/api";
import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";


let initialState = {
    packs: [] as CardPacksType
}

export const packsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS': {
            return {...state, packs: action.packs}
        }
        case "PACKS/ADD-PACK":
            return {...state, packs: [...state.packs, action.pack]}
        default:
            return state
    }
}

// ACTIONS
const setPacks = (packs: CardPacksType) => ({type: 'PACKS/SET-PACKS', packs} as const)
const addPack = (pack: OneCardPackType) => ({type: 'PACKS/ADD-PACK', pack} as const)

// TYPES
type initialStateType = typeof initialState
type ActionType = ReturnType<typeof setPacks> | ReturnType<typeof addPack>
export type OneCardPackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type CardPacksType = Array<OneCardPackType>
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>


// THUNKS
export const setPacksThunk = () => async (dispatch: Dispatch) => {
    await API.setPacks()
        .then( (res) => {
            debugger
            dispatch(setPacks(res.data.cardPacks))
        })
}

export const addPackThunk = (): ThunkType => async (dispatch) => {
    await API.addPack()
        .then( (res) => {
            debugger
            dispatch(addPack(res.data))
            dispatch(setPacksThunk())
        } )
}