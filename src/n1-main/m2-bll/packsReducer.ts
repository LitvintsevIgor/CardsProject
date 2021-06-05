import {Dispatch} from "redux";
import {API} from "../m3-dal/api";
import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";


let initialState = {
    packs: [] as CardPacksType
}

export const packsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "PACKS/DELETE-PACK":
            return {...state, packs: state.packs.filter( (p) => p._id !== action.packId )}
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
const deletePack = (packId: string) => ({type: 'PACKS/DELETE-PACK', packId} as const)

// TYPES
type initialStateType = typeof initialState
type ActionType = ReturnType<typeof setPacks> | ReturnType<typeof addPack> | ReturnType<typeof deletePack>
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
            dispatch(setPacks(res.data.cardPacks))
        })
}

export const addPackThunk = (packName: string): ThunkType => async (dispatch) => {
    await API.addPack(packName)
        .then( (res) => {
            dispatch(addPack(res.data))
            dispatch(setPacksThunk())
        } )
}

export const deletePackThunk = (packId: string): ThunkType => async (dispatch) => {
    await API.deletePack(packId)
        .then( (res) => {
            dispatch(deletePack(packId))
            dispatch(setPacksThunk())
        } )
}
