import React from "react";
import s from "./PasswordRecovery.module.scss";
import Logo from "../../../n1-main/m1-ui/common/logo/Logo";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";

export const PasswordRecovery = () => {
    return (
        <div className={s.recoveryPage}>
            <div className={s.wrap}>
                <Logo/>
                <h1 className={s.title}>Sign in</h1>
                <SuperInputText className={s.input} placeholder={'Email'}/>
                <p className={s.textDiscr}>Enter your email address and we will send you further instructions </p>
                <SuperButton className={s.btnSend} >Send Instructions</SuperButton>
                <p className={s.txtQuestion}>Did you remember your password?</p>
                <SuperButton className={s.btnLogging}>Try logging in</SuperButton>
            </div>
        </div>
    )
}