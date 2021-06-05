import React from "react";
import s from "./Header.module.scss"
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";
import Logo from "../common/logo/Logo";
import {useDispatch} from "react-redux";
import {logoutThunk} from "../../m2-bll/loginReducer";

export const Header = () => {
    const dispatch = useDispatch()
    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.wrap}>
                    <Logo/>
                    <nav className={s.navMenu}>
                        <NavLink to={PATH.LOGIN}>Login</NavLink>
                        <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
                        <NavLink to={PATH.RECOVERY}>Password Recovery</NavLink>
                        <NavLink to={PATH.PROFILE}>Profile</NavLink>
                        <NavLink to={PATH.PACKS}>Packs</NavLink>
                        <NavLink to={PATH.CARDS}>Cards</NavLink>
                        <NavLink to={PATH.ERROR}>404</NavLink>
                        <NavLink to={PATH.LOGIN} onClick={() => dispatch(logoutThunk())}>Logout</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}
