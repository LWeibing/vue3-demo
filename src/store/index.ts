import {defineStore} from 'pinia'

export const mainStore = defineStore('main', {
    state() {
        return {
            user: {},
            token:'',
            routes:[],
            studentList:[],
            userList:[],
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
        setStudentList(state:[]) {
            this.studentList = state
        },
        setUserList(state:[]) {
            this.userList = state
        },
    },
    persist: {
        paths: ['user','token','routes'],
        storage: localStorage,
    }
})