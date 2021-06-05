import React from "react";
import s from "./Modal.module.scss"

type PopUpProps = {
    setServerErrorCallback: (text: string | null) => void
    text: string | null
}

export const PopUp: React.FC<PopUpProps> = ({setServerErrorCallback, text}) => {
    const onClickHandler = () => {
        setServerErrorCallback(null)
    }
    return (
        <div className={s.modalBox}>
            <div className={s.content}>
                <p>{text}</p>
                <button onClick={onClickHandler}>close</button>
            </div>
        </div>
    )
}