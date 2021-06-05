import React from "react";
import s from "./NewPasswordForm.module.scss";
import Logo from "../../../n1-main/m1-ui/common/logo/Logo";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import eyeIcon from "../../../assets/images/icons/eye.png";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";

export const NewPasswordForm = () => {
    return (
        <div className={s.newForm}>
            <div className={s.wrap}>
                <Logo/>
                <h1 className={s.title}>Create new password</h1>
                <div className={s.passwordBox}>
                    <SuperInputText className={s.input} placeholder={'********'}  />
                    <button className={s.btnShow}><img src={eyeIcon} alt="eye-Icon"/></button>
                </div>
                <p className={s.textDiscr}>Create new password and we will send you further instructions to email </p>
                <SuperButton className={s.btnCreate} >Create new password</SuperButton>

            </div>
        </div>
    )
}