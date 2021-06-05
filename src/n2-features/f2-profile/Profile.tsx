import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import {ProfileType} from "../../n1-main/m3-dal/api";
import {authMe, setProfileError, updateProfile} from "../../n1-main/m2-bll/profileReducer";
import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {SuperInputText} from "../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {PopUp} from "../../n1-main/m1-ui/common/utills/modal-popUp/PopUp";

export const Profile = React.memo(() => {
    //HOOKS
    const dispatch = useDispatch()
    const user = useSelector<RootReducerType, ProfileType | null>(state => state.profile.user)
    const {loading, success, profileError} = useSelector<RootReducerType, { loading: boolean, success: boolean, profileError: string }>(state => state.profile);

    //UPDATING PROFILE
    const [change, setChange] = useState(false)
    const [name, setName] = useState('')
    const [baseImage, setBaseImage] = useState(user ? user.avatar : '');

    //ENCODING UPDATED DATA TO BASE64
    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].type !== 'image/jpeg' && 'image/png' && 'image/jpg') {
                dispatch(setProfileError('The picture must be a file of type: jpeg, jpg, png'))
            } else {
                const file = e.target.files[0];
                const base64: any = await convertBase64(file);
                setBaseImage(base64);
            }
        }
    };
    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    //SENDING DATA
    const updateProfileHandler = () => {
        setChange(!change)
        if (change) {
            dispatch(updateProfile(name, baseImage))
        }
    }

    useEffect(() => {
        if (user === null) {
            dispatch(authMe())
        }
        if (user)
            setName(user.name)
    }, [user, dispatch])

    //HANDLERS
    const onClosePopUpHandler = () => {
        dispatch(setProfileError(''))
    }

    if (success && user === null) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div>
            {loading && <div>LOADING......</div>}
            {
                profileError.length > 0 && <PopUp setServerErrorCallback={onClosePopUpHandler} text={profileError}/>
            }
            {/* user && profileError.length === 0 &&*/}
            {success &&
            <>
                <div>
                    <img style={{width: '100px', height: '100px'}} src={user ? user.avatar : ''} alt={'userPhoto'}/>
                </div>
                {change &&
                <div>
                    <input type='file' onChange={event => uploadImage(event)}/>
                </div>
                }

                {!change
                    ? <div>{user && user.name}</div>
                    : <div><SuperInputText value={name ? name : ''}
                                           onChangeText={setName}/>
                    </div>
                }
                <button onClick={updateProfileHandler} disabled={loading}>{change ? 'save' : 'change'}</button>
                <hr></hr>

                {/*//@ts-ignore*/}
                {user && Object.keys(user).filter((key) => key !== 'avatar').map((key, index) => <p key={index}><b>{key}:</b>{user[key]}</p>)}
            </>
            }
        </div>
    )
})