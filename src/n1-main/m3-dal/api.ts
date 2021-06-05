import axios from "axios";
import {OneCardPackType} from "../m2-bll/packsReducer";

const instance = axios.create({
    //baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
});

export const API = {
    async login(email: string, password: string, rememberMe: boolean) {
        return await instance.post<ProfileType>(`auth/login`, {
            email: email,
            password: password,
            rememberMe: rememberMe
        }, {})
    },
    async registration(email: string, password: string) {
        return await instance.post('auth/register', {email: email, password: password})
    },
    async authMe() {
        return await instance.post<ProfileType>('auth/me')
    },
    async forgot(email: string) {
        return await instance.post('auth/forgot', {
            email: email, from: "test-front-admin <litvincevi@mail.ru>",
            message: `<div style="background-color: lime; padding: 15px"> password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
        }, {})
    },
    async newPassword(password: string, resetPasswordToken: string) {
        return await instance.post('auth/set-new-password', {
            password: password,
            resetPasswordToken: resetPasswordToken
        })
    },
    async logOut() {
        return await instance.delete('auth/me')
    },
    async updateProfile(name: string | null, avatar: string) {
        return await instance.put('auth/me', {name: name, avatar: avatar})
    },
    async setPacks() {
        return await instance.get<PacksType>('/cards/pack')
    },
    async addPack(packName: string) {
        return await instance.post('/cards/pack',
            {
                cardsPack:
                    {
                        name: packName,
                        path: "/def",
                        grade: 0,
                        shots: 0,
                        rating: 0,
                        deckCover: "url or base64",
                        private: false,
                        type: "pack"
                    }
            })
    },
    async deletePack(packId: string) {
        return await instance.delete(`/cards/pack?id=${packId}`)
    }
}

//RESPONSE TYPES
export type ProfileType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: false
    __v: number
    _id: string
}

export type PacksType = {
    cardPacks: OneCardPackType[],
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
