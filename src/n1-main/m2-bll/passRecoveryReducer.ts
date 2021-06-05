import {Dispatch} from "redux";
import {API} from "../m3-dal/api";
import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";
import {validation} from "../m1-ui/common/utills/validation";


const initialState = {
    success: false,
    loading: false,
    error: ''
}

export const passRecoveryReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "RECOVERY/SET_LOADING":
            return {...state, loading: action.loading}
        case "RECOVERY/SET_ERROR":
            return {...state, error: action.error}
        case 'RECOVERY/SET_SUCCESS':
            return {...state, success: action.success}
        default:
            return state
    }
}

// ACTIONS
const setPassRecoverySuccess = (success: boolean) => ({type: 'RECOVERY/SET_SUCCESS', success}) as const
export const setPassRecoveryError = (error: string) => ({type: 'RECOVERY/SET_ERROR', error}) as const
const setPassRecoveryLoading = (loading: boolean) => ({type: 'RECOVERY/SET_LOADING', loading}) as const

// THUNKS
export const passRecoveryThunk = (email: string): ThunkType => async (dispatch: Dispatch<ActionType>) => {
    const emailValidation = validation.email(email)
    if (emailValidation.length > 0) {

        dispatch(setPassRecoveryError(emailValidation))
    } else {
        dispatch(setPassRecoveryError(''))
        dispatch(setPassRecoveryLoading(true))
        try {
            await API.forgot(email)
            dispatch(setPassRecoverySuccess(true))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setPassRecoveryError(error))
        } finally {
            dispatch(setPassRecoveryLoading(false))
        }
    }
}

// TYPES
type InitialStateType = typeof initialState
type setPassRecoverySuccessType = ReturnType<typeof setPassRecoverySuccess>
type setPassRecoveryErrorType = ReturnType<typeof setPassRecoveryError>
type setPassRecoveryLoadingType = ReturnType<typeof setPassRecoveryLoading>
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type ActionType = setPassRecoverySuccessType | setPassRecoveryErrorType | setPassRecoveryLoadingType
