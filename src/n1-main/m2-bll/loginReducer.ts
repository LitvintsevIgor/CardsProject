import {ThunkAction} from "redux-thunk";
import {API} from "../m3-dal/api";
import {ActionType as ProfileActionType, setProfile, setProfileError, SetProfileErrorType, setProfileSuccess as setSuccessProfile, SetProfileType} from "./profileReducer";
import {RootReducerType} from "./store";
import {validation} from "../m1-ui/common/utills/validation";

const initialState = {
    loading: false,
    success: false,
    error: ''
}
export const loginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-LOGIN-ERROR":
            return {...state, error: action.error}
        case "LOGIN/SET-LOGIN-LOADING":
            return {...state, loading: action.loading}
        case "LOGIN/SET-LOGIN-SUCCESS":
            return {...state, success: action.success}
        default:
            return state
    }
}

//ACTIONS
export const setLoginError = (error: string) => ({type: "LOGIN/SET-LOGIN-ERROR", error} as const)
const setLoginSuccess = (success: boolean) => ({type: "LOGIN/SET-LOGIN-SUCCESS", success} as const)
const setLoginLoading = (loading: boolean) => ({type: "LOGIN/SET-LOGIN-LOADING", loading} as const)

//THUNKS
export const loginThunk = (email: string, password: string, remember: boolean): ThunkType => async (dispatch) => {
    const emailValidation = validation.email(email)
    const passwordValidation = validation.password(password)
    if (emailValidation.length > 0) {
        dispatch(setLoginError(emailValidation))
    } else if (passwordValidation.length > 0) {
        dispatch(setLoginError(passwordValidation))
    } else {
        dispatch(setLoginError(''))
        dispatch(setLoginLoading(true))
        try {
            const response = await API.login(email, password, remember)
            dispatch(setProfile(response.data))
            dispatch(setLoginSuccess(true))
            dispatch(setSuccessProfile(true))
            dispatch(setProfileError(''))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setLoginError(error))
        } finally {
            dispatch(setLoginLoading(false))
        }
    }
}

export const logoutThunk = (): ThunkType => async (dispatch) => {
    dispatch(setLoginLoading(true))
    try {
        await API.logOut()
        dispatch(setLoginSuccess(false))
        dispatch(setProfile(null))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setLoginError(error))
    } finally {
        dispatch(setLoginLoading(false))
    }
}

//TYPES
export type InitialStateType = typeof initialState
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type SetErrorType = ReturnType<typeof setLoginError>
type SetSuccessType = ReturnType<typeof setLoginSuccess>
type SetLoadingType = ReturnType<typeof setLoginLoading>
type ActionType = SetErrorType
    | SetSuccessType
    | SetLoadingType
    | SetProfileType
    | SetProfileErrorType
    | ProfileActionType