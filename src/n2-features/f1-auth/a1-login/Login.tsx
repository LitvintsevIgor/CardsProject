import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperCheckbox from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {InitialStateType as LoginStateType, loginThunk, setLoginError} from "../../../n1-main/m2-bll/loginReducer";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import {Redirect, useHistory} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import s from "./Login.module.scss"
import Logo from "../../../n1-main/m1-ui/common/logo/Logo";
import eyeIcon from "../../../assets/images/icons/eye.png";
import {PopUp} from "../../../n1-main/m1-ui/common/utills/modal-popUp/PopUp";

export const Login = () => {
    //HOOKS
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        loading,
        success,
        error
    } = useSelector<RootReducerType, LoginStateType>(state => state.login);

    //HANDLERS
    const onLoginButtonHandler = async () => {
        dispatch(loginThunk(email, password, remember))

    }
    const onRecoveryButtonHandler = () => {
        history.push(PATH.RECOVERY)
    }
    const onRegistrationButtonHandler = () => {
        history.push(PATH.REGISTRATION)
    }
    const onClosePopUpHandler = () => {
        dispatch(setLoginError(''))
    }

    if (success) {
        return <Redirect to={PATH.PROFILE}/>
    }
    return (
        <div className={s.loginPage}>
            <div className={s.wrap}>
                {
                    loading && <div>LOADING......</div>
                }
                {
                    error.length > 0 && <PopUp setServerErrorCallback={onClosePopUpHandler} text={error}/>
                }
                <Logo/>
                <h1 className={s.title}>Sign in</h1>
                <p className={s.emailText}>Email</p>
                <SuperInputText className={s.input} placeholder={'j&johnson@gmail.com'}
                                onChangeText={(email) => setEmail(email)}/>
                <div className={s.passwordBox}>
                    <p className={s.passwordText}>Password</p>
                    <SuperInputText className={s.input} placeholder={'********'} type={'password'}
                                    onChangeText={(password) => setPassword(password)}/>
                    <button className={s.btnShow}><img src={eyeIcon} alt="eye-Icon"/></button>

                </div>
                <div className={s.remember}>
                    <SuperCheckbox className={s.checkbox} onChangeChecked={(remember) => setRemember(remember)}/>
                    <p className={s.rememberText}>Remember</p>

                </div>
                <SuperButton disabled={loading} onClick={onLoginButtonHandler}>Login</SuperButton>

                <SuperButton disabled={loading} onClick={onRecoveryButtonHandler}>Forgot password</SuperButton>
                <SuperButton disabled={loading} onClick={onRegistrationButtonHandler}>Sign Up</SuperButton>
            </div>
        </div>
    )
}

