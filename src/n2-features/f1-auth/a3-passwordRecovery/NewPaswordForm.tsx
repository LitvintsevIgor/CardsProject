import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import {newPasswordThunk, setNewPasswordError} from "../../../n1-main/m2-bll/newPasswordReducer";
import {Redirect, useParams} from 'react-router-dom'
import {PopUp} from "../../../n1-main/m1-ui/common/utills/modal-popUp/PopUp";
import s from './NewPasswordForm.module.scss'
import eyeIcon from "../../../assets/images/icons/eye.png";
import Logo from "../../../n1-main/m1-ui/common/logo/Logo";

export const NewPasswordForm = () => {

    //HOOKS
    const [password, setPassword] = useState('')
    const {success, loading, error} = useSelector<RootReducerType, { success: boolean, loading: boolean, error: string }>((state) => state.newPassword)
    const dispatch = useDispatch()
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>();

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
            <div className={s.newForm}>
                <div className={s.wrap}>
                    <Logo/>
                    {loading && <div>Loading...</div>}
                    {error && <PopUp setServerErrorCallback={onClosePopupHandler} text={error}/>}
                    <h1 className={s.title}>Create new password</h1>
                    <div className={s.passwordBox}>
                        <SuperInputText onChangeText={(password) => setPassword(password)}
                                        className={s.input}
                                        placeholder={'********'}
                                        type={'password'}
                        />
                        <button className={s.btnShow}><img src={eyeIcon} alt="eye-Icon"/></button>
                    </div>
                    <p className={s.textDiscr}>Create new password and we will send you further instructions to email </p>
                    <SuperButton className={s.btnCreate} onClick={onNewPasswordButtonHandler}>Create new password</SuperButton>
                </div>
            </div>

        </div>
    )
}