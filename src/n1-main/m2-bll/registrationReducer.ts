import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";
import {API} from "../m3-dal/api";
import {validation} from "../m1-ui/common/utills/validation";

const initialState = {
    loading: false,
    success: false,
    error: ''
}

export const registrationReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/SET-REGISTRATION-ERROR":
            return {...state, error: action.error}
        case "REGISTRATION/SET-REGISTRATION-LOADING":
            return {...state, loading: action.loading}
        case "REGISTRATION/SET-REGISTRATION-SUCCESS":
            return {...state, success: action.success}
        default:
            return state
    }
}

//ACTIONS
const setRegistrationLoading = (loading: boolean) => ({type: "REGISTRATION/SET-REGISTRATION-LOADING", loading} as const)
const setRegistrationSuccess = (success: boolean) => ({type: "REGISTRATION/SET-REGISTRATION-SUCCESS", success} as const)
export const setRegistrationError = (error: string) => ({type: "REGISTRATION/SET-REGISTRATION-ERROR", error} as const)

//THUNKS
export const registrationThunk = (email: string, password: string, confPassword: string): ThunkType => async (dispatch) => {
    const emailValidation = validation.email(email)
    const passwordValidation = validation.password(password)
    if (emailValidation.length > 0) {
        dispatch(setRegistrationError(emailValidation))
    } else if (passwordValidation.length > 0) {
        dispatch(setRegistrationError(passwordValidation))
    } else if (password !== confPassword) {
        dispatch(setRegistrationError('Passwords don\'t match!'))
    } else {
        dispatch(setRegistrationError(''))
        dispatch(setRegistrationLoading(true))
        try {
            await API.registration(email, password)
            dispatch(setRegistrationSuccess(true))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setRegistrationError(error))
        } finally {
            dispatch(setRegistrationLoading(false))
        }
    }
}

//TYPES
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type ActionType = SetSuccessType | SetLoadingType | SetErrorType
type SetErrorType = ReturnType<typeof setRegistrationError>
type SetSuccessType = ReturnType<typeof setRegistrationSuccess>
type SetLoadingType = ReturnType<typeof setRegistrationLoading>
type InitialStateType = typeof initialState