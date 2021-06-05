import {API, ProfileType} from "../m3-dal/api"
import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";

const initialState = {
    user: null as ProfileType | null,
    loading: false,
    success: false,
    profileError: '',
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET-PROFILE":
            return {...state, user: action.data}
        case "PROFILE/SET-PROFILE-ERROR":
            return {...state, profileError: action.profileError}
        case "PROFILE/SET-PROFILE-LOADING":
            return {...state, loading: action.loading}
        case "PROFILE/SET-PROFILE-SUCCESS":
            return {...state, success: action.success}
        default:
            return state
    }
}

export const setProfile = (data: ProfileType | null) => ({type: 'PROFILE/SET-PROFILE', data} as const)
const setProfileLoading = (loading: boolean) => ({type: "PROFILE/SET-PROFILE-LOADING", loading} as const)
export const setProfileSuccess = (success: boolean) => ({type: "PROFILE/SET-PROFILE-SUCCESS", success} as const)
export const setProfileError = (profileError: string) => ({type: "PROFILE/SET-PROFILE-ERROR", profileError} as const)

//THUNKS
export const authMe = (): ThunkType => async (dispatch) => {
    dispatch(setProfileLoading(true))
    try {
        const response = await API.authMe()
        dispatch(setProfile(response.data))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setProfileError(error))
    } finally {
        dispatch(setProfileSuccess(true))
        dispatch(setProfileLoading(false))
    }
}

export const updateProfile = (name: string | null, avatar: string): ThunkType => async (dispatch) => {
    dispatch(setProfileLoading(true))
    try {
        await API.updateProfile(name, avatar)
        dispatch(authMe())
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setProfileError(error))
    } finally {
        //dispatch(setProfileSuccess(true))
        //dispatch(setProfileLoading(false))
    }
}

//TYPES
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type InitialStateType = typeof initialState
export type SetProfileType = ReturnType<typeof setProfile>
export type SetProfileErrorType = ReturnType<typeof setProfileError>
type SetSuccessType = ReturnType<typeof setProfileSuccess>
type SetLoadingType = ReturnType<typeof setProfileLoading>
export type ActionType = SetProfileType | SetLoadingType | SetProfileErrorType | SetSuccessType