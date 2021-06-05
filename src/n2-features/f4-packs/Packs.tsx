import React, { useEffect } from 'react';
import {SuperInputText} from "../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {addPackThunk, CardPacksType, setPacksThunk} from "../../n1-main/m2-bll/packsReducer";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import style from './Packs.module.css'

export const Packs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPacksThunk())
    }, [])

    let packs = useSelector<RootReducerType, CardPacksType> (state => state.packs.packs)

    let handleAddPack = () => {
        dispatch(addPackThunk())
    }

    debugger
    return (
        <div>
            <h1>Packs list</h1>
            <div>
                <SuperInputText/>
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
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    )
}