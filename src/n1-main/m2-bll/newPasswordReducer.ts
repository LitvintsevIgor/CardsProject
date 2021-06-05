import {Dispatch} from "redux";
import {API} from "../m3-dal/api";
import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";
import {validation} from "../m1-ui/common/utills/validation";

const initialState = {
    success: false,
    error: '',
    loading: false
}

export const newPasswordReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "NEW_PASSWORD/SET_LOADING":
            return {...state, loading: action.loading}
        case "NEW_PASSWORD/SET_ERROR":
            return {...state, error: action.error}
        case 'NEW_PASSWORD/SET_SUCCESS': {
            return {...state, success: action.success}
        }
        default:
            return state
    }
}

// ACTIONS
export const setNewPasswordSuccess = (success: boolean) => ({type: 'NEW_PASSWORD/SET_SUCCESS', success}) as const
export const setNewPasswordError = (error: string) => ({type: 'NEW_PASSWORD/SET_ERROR', error}) as const
export const setNewPasswordLoading = (loading: boolean) => ({type: 'NEW_PASSWORD/SET_LOADING', loading}) as const

// THUNKS
export const newPasswordThunk = (password: string, resetPasswordToken: string): ThunkType => async (dispatch: Dispatch<ActionType>) => {
    const passwordValidation = validation.password(password)
    if (passwordValidation) {
        dispatch(setNewPasswordError(passwordValidation))
    } else {
        dispatch(setNewPasswordError(''))
        dispatch(setNewPasswordLoading(true))
        try {
            await API.newPassword(password, resetPasswordToken)
            dispatch(setNewPasswordSuccess(true))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setNewPasswordError(error))
        } finally {
            dispatch(setNewPasswordLoading(false))
        }
    }
}

// TYPES
type InitialStateType = typeof initialState
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type setNewPasswordSuccessType = ReturnType<typeof setNewPasswordSuccess>
type setNewPasswordErrorType = ReturnType<typeof setNewPasswordError>
type setNewPasswordLoadingType = ReturnType<typeof setNewPasswordLoading>
type ActionType = setNewPasswordSuccessType | setNewPasswordErrorType | setNewPasswordLoadingType
