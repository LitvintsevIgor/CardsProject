import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from 'react';
import {SuperInputText} from "../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {addPackThunk, CardPacksType, deletePackThunk, setPacksThunk} from "../../n1-main/m2-bll/packsReducer";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import style from './Packs.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import s from "../f1-auth/a3-passwordRecovery/PasswordRecovery.module.scss";
import {setCardsThunk} from "../../n1-main/m2-bll/cardsReducer";
import {Cards} from "../f5-cards/Cards";

export const Packs = () => {

    // HOOKS
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPacksThunk())
    }, [])
    const packs = useSelector<RootReducerType, CardPacksType> (state => state.packs.packs)
    const [packName, setPackName] = useState('')


    // HANDLERS
    const handleAddPack = () => {
        dispatch(addPackThunk(packName))
        setPackName('')
    }
    const handleDeletePack = (packId: string) => {
        dispatch(deletePackThunk(packId))
    }
    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    const handleOnLearnButton = (packId: string) => {
        dispatch(setCardsThunk(packId))
    }


    return (
        <div>
            <h1>Packs list</h1>
            <div>
                <SuperInputText onChange={handleChangeText} value={packName}/>
                <SuperButton onClick={handleAddPack} >Add new pack</SuperButton>
            </div>
            <div>
                {
                    packs.map( (pack) => {
                        return (
                            <div className={style.packRow}>
                                <div>
                                    {pack.name}
                                </div>
                                <div>
                                    {pack.cardsCount}
                                </div>
                                <div>
                                    {pack.updated}
                                </div>
                                <div>
                                    {pack.user_name}
                                </div>
                                <div>
                                    <button onClick={ () => handleDeletePack(pack._id)}>Delete</button>
                                </div>
                                <div>
                                    <NavLink to={PATH.CARDS} onClick={ () => handleOnLearnButton(pack._id)}>Learn</NavLink>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    )
}