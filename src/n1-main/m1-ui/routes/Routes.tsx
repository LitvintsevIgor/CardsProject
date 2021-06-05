import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../../../n2-features/f1-auth/a1-login/Login";
import {PasswordRecovery} from "../../../n2-features/f1-auth/a3-passwordRecovery/PasswordRecovery";
import {Registration} from "../../../n2-features/f1-auth/a2-registration/Registration";
import {Profile} from "../../../n2-features/f2-profile/Profile";
import {Page404} from "../../../n2-features/f3-error/Page404";
import { NewPasswordForm } from "../../../n2-features/f1-auth/a3-passwordRecovery/NewPaswordForm";
import {Packs} from "../../../n2-features/f4-packs/Packs";
import {Cards} from "../../../n2-features/cards/Cards";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    RECOVERY: '/recovery',
    PROFILE: '/profile',
    ERROR: '/404',
    PACKS: '/f4-packs',
    CARDS: '/cards',
    NEW_PASSWORD: '/set-new-password'
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.RECOVERY} render={() => <PasswordRecovery/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.PACKS} render={() => <Packs/>}/>
                <Route path={PATH.CARDS} render={() => <Cards/>}/>
                <Route path={PATH.NEW_PASSWORD + `/:resetPasswordToken`}>
                    <NewPasswordForm/>
                </Route>
                <Redirect from={'/'} to={PATH.LOGIN}/>
                <Route render={() => <Page404/>}/>
            </Switch>
        </div>
    )
}