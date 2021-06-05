import React, {MouseEventHandler, useEffect} from 'react';
import {SuperInputText} from "../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {addPackThunk, CardPacksType, deletePackThunk, setPacksThunk} from "../../n1-main/m2-bll/packsReducer";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import style from './Packs.module.css'

export const Packs = () => {

    // HOOKS
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPacksThunk())
    }, [])
    const packs = useSelector<RootReducerType, CardPacksType> (state => state.packs.packs)


    // HANDLERS
    const handleAddPack = () => {
        dispatch(addPackThunk())
    }
    const handleDeletePack = (packId: string) => {
        debugger
        dispatch(deletePackThunk(packId))
    }


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
                                <div>
                                    <button onClick={ () => handleDeletePack(pack._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    )
}