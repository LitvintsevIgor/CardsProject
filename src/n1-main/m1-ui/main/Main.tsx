import React from "react"
import { Header } from "../header/Header";
import { Routes } from "../routes/Routes";

import s from "./Main.module.scss"

export const Main = () => {
    return (
        <div className={s.main}>
            <Header />
            <Routes />
        </div>
    )
}