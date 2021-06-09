import React, {ChangeEvent, useEffect, useState} from 'react';
import {SuperInputText} from "../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {
    CardPacksType,
    deletePackThunk,
    getPacksThunk,
    openPopUpAddPack
} from "../../n1-main/m2-bll/packsReducer";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import s from './Packs.module.scss'
import {NavLink} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {setCardsThunk, setPackId} from "../../n1-main/m2-bll/cardsReducer";
import Pagination from 'rc-pagination';
import localeInfo from './../../locale/en_US'
import './Pagination.scss'
import MultiRangeSlider from './PacksSorting';
import Select from 'rc-select';
import './Rc-select.scss'
import {PopUp} from "../../n1-main/m1-ui/common/utills/modal-popUp/PopUp";


export const Packs = () => {

    // HOOKS
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPacksThunk())
    }, [dispatch])
    const packs = useSelector<RootReducerType, CardPacksType>(state => state.packs.packs)
    const [privateFilter, setPrivateFilter] = useState<'all' | 'private'>('all')
    const cardPackTotalCount = useSelector<RootReducerType, number>(state => state.packs.cardPackTotalCount)
    const user_id = useSelector<RootReducerType, string | undefined>(state => state.profile.user?._id)
    const openPopUp = useSelector<RootReducerType, boolean>(state => state.packs.wantToAddPack)
    const loading = useSelector<RootReducerType, boolean>( state => state.packs.loading )

    // HANDLERS
    const handleAddPack = () => {
        dispatch(openPopUpAddPack(true))
    }
    const handleDeletePack = (packId: string) => {
        dispatch(deletePackThunk(packId))
    }
    const handleOnLearnButton = (packId: string) => {
        dispatch(setCardsThunk(packId))
        dispatch(setPackId(packId))
    }
    const handleClosePopUp = () => {
        dispatch(openPopUpAddPack(false))
    }


    //FILTER HANDLERS
    const onChangeShowSize = (current: number, pageSize: number) => {
        dispatch(getPacksThunk({page: current, pageCount: pageSize}))
    }
    const onChangeMinMaxValues = (min: number, max: number) => {
        dispatch(getPacksThunk({min: min, max: max}))
    }
    const onChangePrivatePackFilter = (filter: string) => {
        if (user_id && filter === 'private') {
            setPrivateFilter("private")
            dispatch(getPacksThunk({user_id}))
        }
        if (filter === 'all') {
            setPrivateFilter("all")
            dispatch(getPacksThunk({user_id: ''}))
        }
    }


    return (
        <div className={s.packs}>
            <div className={s.wrap}>
                <div className={s.sidebar}>
                    <h3 className={s.btnTitle}>Show packs cards</h3>
                    <div className={s.btnBox}>
                        <SuperButton className={s.btn} disabled={privateFilter === "private"}
                                     onClick={() => onChangePrivatePackFilter('private')}>My</SuperButton>
                        <SuperButton className={s.btn} disabled={privateFilter === "all"}
                                     onClick={() => onChangePrivatePackFilter('all')}>All</SuperButton>
                    </div>
                    <h3 className={s.inputTitle}>Number of cards</h3>
                    <MultiRangeSlider min={0} max={50} onChangeMinMaxValues={onChangeMinMaxValues}/>

                </div>
                <div className={s.listBlock}>
                    <h2 className={s.listTitle}>Packs list</h2>
                    <div className={s.addPack}>
                        <div className={s.inputSearchWrap}>
                            <SuperInputText className={s.inputSearch} placeholder={'Search...'}/>
                        </div>
                        <SuperButton className={s.addBtn} onClick={handleAddPack}>Add new pack</SuperButton>
                        {
                            openPopUp &&
                            <PopUp setServerErrorCallback={handleClosePopUp}
                                   textForPlaceholder={"Name Pack.."}
                                   popUpTitle={"Add new pack"}
                            />
                        }
                    </div>
                    <div className={s.table}>
                        {
                            loading && <div>Loading ...</div>
                        }
                        <div className={s.tableHeader}>
                            <div className={s.tableItem}>Name</div>
                            <div className={s.tableItem}>Cards</div>
                            <div className={s.tableItem}>Last Updated</div>
                            <div className={s.tableItem}>Created by</div>
                            <div className={s.tableItem}>Actions</div>
                        </div>

                        {
                            packs.map((pack, index) => {
                                return (
                                    <div className={s.packRow} key={index}>

                                        <div className={s.packRowItem}>

                                            {pack.name}
                                        </div>
                                        <div className={s.packRowItem}>

                                            {pack.cardsCount}
                                        </div>
                                        <div className={s.packRowItem}>

                                            {pack.updated}
                                        </div>
                                        <div className={s.packRowItem}>

                                            {pack.user_name}
                                        </div>
                                        <div className={s.packRowItem}>

                                            <button className={s.packRowBtn} onClick={() => handleDeletePack(pack._id)}>Delete</button>
                                            <NavLink className={s.packRowLink} to={PATH.CARDS}
                                                     onClick={() => handleOnLearnButton(pack._id)}>Learn</NavLink>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={s.pagination}>
                        <Pagination
                            selectComponentClass={Select}
                            showQuickJumper
                            showSizeChanger
                            onShowSizeChange={onChangeShowSize}
                            onChange={onChangeShowSize}
                            total={cardPackTotalCount}
                            locale={localeInfo}
                            pageSizeOptions={['10', '20', '50']}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}