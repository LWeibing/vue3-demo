import {defineStore} from 'pinia'

export const mainStore = defineStore('main', {
    state() {
        return {
            user: {},
            token:'',
            routes:[]
        }
    },
    actions: {
        setUser(state:any) {
            this.user = state
        },
        setToken(state:string) {
            this.token = state
        },
        setRoutes(state:[]) {
            this.routes = state
        },
    },
    persist: {
        paths: ['user','token','routes'],
        storage: localStorage,
    }
})