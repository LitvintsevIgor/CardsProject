import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import {newPasswordThunk, setNewPasswordError} from "../../../n1-main/m2-bll/newPasswordReducer";
import {Redirect, useParams} from 'react-router-dom'
import {PopUp} from "../../../n1-main/m1-ui/common/utills/modal-popUp/PopUp";

export const NewPasswordForm = () => {

    //HOOKS
    const [password, setPassword] = useState('')
    const {success, loading, error} = useSelector<RootReducerType, {success: boolean, loading: boolean, error: string}>( (state) => state.newPassword)
    const dispatch = useDispatch()
    const {resetPasswordToken} = useParams<{resetPasswordToken: string}>();

    //HANDLERS
    const onNewPasswordButtonHandler = () => {
        dispatch(newPasswordThunk(password, resetPasswordToken))
    }
    const onClosePopupHandler = () => {
        dispatch(setNewPasswordError(''))
    }

    if (success) {
        return (
            <div>
                <Redirect to={'/login'}/>
            </div>
        )
    }

    return (

        <div>
            {loading && <div>Loading...</div>}
            {error && <PopUp setServerErrorCallback={onClosePopupHandler} text={error}/>}
            <h2>IT-INCUBATOR</h2>
            <h3>Create new password</h3>
            <SuperInputText onChangeText={(password) => setPassword(password)} />
            <div>Create new password and we will send you further instructions to mail</div>
            <div>
                <SuperButton onClick={onNewPasswordButtonHandler}>Create new password</SuperButton>
            </div>
        </div>
    )
}