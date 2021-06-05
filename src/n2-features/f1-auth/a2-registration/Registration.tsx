import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import {Redirect, useHistory} from "react-router-dom";
import {registrationThunk, setRegistrationError} from "../../../n1-main/m2-bll/registrationReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import s from "./Registration.module.scss";
import Logo from "../../../n1-main/m1-ui/common/logo/Logo";
import eyeIcon from "./../../../assets/images/icons/eye.png";
import {PopUp} from "../../../n1-main/m1-ui/common/utills/modal-popUp/PopUp";

export const Registration = () => {
    //HOOKS
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const {
        loading,
        success,
        error
    } = useSelector<RootReducerType, { loading: boolean, success: boolean, error: string }>(state => state.registration);

    //HANDLERS
    const onCancelButtonHandler = () => {
        history.push(PATH.LOGIN)
    };
    const onRegisterButtonHandler = () => {
        dispatch(registrationThunk(email, password, confPassword))
    };
    const onClosePopUpHandler = () => {
        dispatch(setRegistrationError(''))
    }
    if (success) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div className={s.registrationPage}>
            <div className={s.wrap}>
                {
                    loading && <div>LOADING......</div>
                }
                {
                    error.length > 0 && <PopUp setServerErrorCallback={onClosePopUpHandler} text={error}/>
                }
                <Logo/>
                <h1 className={s.title}>Sign up</h1>
                <p className={s.emailText}>Email</p>
                <SuperInputText className={s.input} placeholder={'j&johnson@gmail.com'}
                                onChangeText={(email: string) => setEmail(email)}/>
                <div className={s.passwordBox}>
                    <p className={s.passwordText}>Password</p>
                    <SuperInputText className={s.input} placeholder={'********'} type={'password'}
                                    onChangeText={(password: string) => setPassword(password)}/>
                    <button className={s.btnShow}><img src={eyeIcon} alt="eye-Icon"/></button>
                </div>
                <div className={s.passwordBox}>
                    <p className={s.confirmText}>Confirm password</p>
                    <SuperInputText placeholder={'********'} className={s.input} type={'password'}
                                    onChangeText={(password: string) => setConfPassword(password)}/>
                    <button className={s.btnShow}><img src={eyeIcon} alt="eye-Icon"/></button>
                </div>
                <div className={s.btnBox}>
                    <SuperButton className={s.btnCancel} disabled={loading}
                                 onClick={onCancelButtonHandler}>Cancel</SuperButton>
                    <SuperButton className={s.btnRegistr} disabled={loading}
                                 onClick={onRegisterButtonHandler}>Registed</SuperButton>
                </div>
            </div>
        </div>
    )
}