import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import { NavLink } from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {passRecoveryThunk, setPassRecoveryError} from "../../../n1-main/m2-bll/passRecoveryReducer";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import { CheckEmail } from "./CheckEmail";
import s from "./PasswordRecovery.module.scss";
import {PopUp} from "../../../n1-main/m1-ui/common/utills/modal-popUp/PopUp";

export const PasswordRecovery = () => {

    // HOOKS
    const [email, setEmail] = useState("")
    const dispatch = useDispatch();
    const {success, loading, error} = useSelector<RootReducerType, {success: boolean, loading: boolean, error: string}>( (state) => state.passRecovery)

    // HANDLERS
    const onEmailButtonHandler = () => {
        dispatch(passRecoveryThunk(email))
    }
    const onClosePopUpHandler = () => {
        dispatch(setPassRecoveryError(''))
    }

    if (success) {
        return (
            <div>
                <CheckEmail email={email}/>
            </div>
        )
    }

    return (
        <div className={s.RecoveryPage}>
            <div className={s.wrap}>
            { loading && <div>Loading...</div> }
            { error && <PopUp setServerErrorCallback={onClosePopUpHandler} text={error}/> }
            <h2 className={s.title}>Forgot your password?</h2>
            <SuperInputText className={s.input} placeholder={'Email'}  onChangeText={ (email) => setEmail(email) }/>
            <p className={s.textDiscr}>Enter yor email address and we will send you further instructions</p>
            <SuperButton className={s.btnSend} onClick={onEmailButtonHandler} >Send instructions</SuperButton>
            <p className={s.txtQuestion}>Did you remember your password?</p>
            <NavLink className={s.btnLogging} to={PATH.LOGIN}>Try logging in</NavLink>
            </div>
        </div>
    )
}