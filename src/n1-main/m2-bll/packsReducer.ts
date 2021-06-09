import {Dispatch} from "redux";
import {API} from "../m3-dal/api";
import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";


let initialState = {
    packs: [] as CardPacksType,
    sortValues: {pageCount: 10} as SortValuesType,
    cardPackTotalCount: 0,
    wantToAddPack: false,
    loading: false
}

export const packsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "PACKS/SET-LOADING":
            return {...state, loading: action.loading}
        case "PACKS/OPEN-POPUP-TO-ADD-PACK":
            return {...state, wantToAddPack: action.wantToAddPack}
        case "PACKS/DELETE-PACK":
            return {...state, packs: state.packs.filter((p) => p._id !== action.packId)}
        case 'PACKS/SET-PACKS': {
            return {...state, packs: action.packs}
        }
        case "PACKS/ADD-PACK":
            return {...state, packs: [...state.packs, action.pack]}
        case "PACKS/SET-TOTAL-PACK-COUNT":
            return {...state, cardPackTotalCount: action.count}
        case "PACKS/SET-FILTER-VALUES": {
            return {
                ...state, sortValues: {...state.sortValues, ...action.values}
            }
        }
        default:
            return state
    }
}

// ACTIONS
const setPacks = (packs: CardPacksType) => ({type: 'PACKS/SET-PACKS', packs} as const)
const addPack = (pack: OneCardPackType) => ({type: 'PACKS/ADD-PACK', pack} as const)
const deletePack = (packId: string) => ({type: 'PACKS/DELETE-PACK', packId} as const)
const setCardPackTotalCount = (count: number) => ({type: 'PACKS/SET-TOTAL-PACK-COUNT', count} as const)
export const setFilterValues = (values: SortValuesType) => ({type: 'PACKS/SET-FILTER-VALUES', values} as const)
export const openPopUpAddPack = (wantToAddPack: boolean) => ({type: 'PACKS/OPEN-POPUP-TO-ADD-PACK', wantToAddPack} as const)
export const setPacksLoading = (loading: boolean) => ({type: 'PACKS/SET-LOADING', loading} as const)


// TYPES
type initialStateType = typeof initialState
type ActionType =
    ReturnType<typeof setPacks>
    | ReturnType<typeof addPack>
    | ReturnType<typeof deletePack>
    | ReturnType<typeof setCardPackTotalCount>
    | ReturnType<typeof setFilterValues>
    | ReturnType<typeof openPopUpAddPack>
    | ReturnType<typeof setPacksLoading>
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
export type SortValuesType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number
    user_id?: string
}

// THUNKS
export const getPacksThunk = (sortValues?: SortValuesType) => async (dispatch: Dispatch, getState: () => RootReducerType) => {
    if (sortValues) {
        dispatch(setFilterValues(sortValues))
    }
    const ReduxFilterValues = getState().packs.sortValues
    await API.getPacks(ReduxFilterValues)
        .then((res) => {
            dispatch(setPacks(res.data.cardPacks))
            dispatch(setCardPackTotalCount(res.data.cardPacksTotalCount))
        })
}

export const addPackThunk = (packName: string): ThunkType => async (dispatch) => {
    dispatch(setPacksLoading(true))
    await API.addPack(packName)
        .then((res) => {
            dispatch(addPack(res.data))
            dispatch(getPacksThunk())
            dispatch(setPacksLoading(false))
            dispatch(openPopUpAddPack(false))
        })
}

export const deletePackThunk = (packId: string): ThunkType => async (dispatch) => {
    dispatch(setPacksLoading(true))
    await API.deletePack(packId)
        .then((res) => {
            dispatch(deletePack(packId))
            dispatch(getPacksThunk())
            dispatch(setPacksLoading(false))
        })
}
