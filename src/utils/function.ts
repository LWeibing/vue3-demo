import {mainStore} from "../store";
import {storeToRefs} from "pinia";
import {INavMenus} from "../models";
import {Document, Setting} from "@element-plus/icons-vue";
import {userSearch} from "../api/user.ts";
import * as studentApi from "../api/student.ts";
import * as userApi from "../api/user.ts";

const store = mainStore()
const {user}: any = storeToRefs(store)

export const getRoutes = () => {
    const nav = user.value.function.nav
    const navArr: Array<INavMenus> = [
        {name: '首页', code: 'index', url: '/index', icon: Document},
        // {
        //     name: '文件管理', url: '/fileManagement', icon: Setting, children: [
        //         {name: '图片', url: '/fileManagement/picture', icon: IconMenu},
        //         {name: '视频', url: '/fileManagement/video', icon: IconMenu},
        //     ]
        // },
        {name: '学员管理', code: 'studentManagement', url: '/studentManagement', icon: Setting},
        {name: '成员管理', code: 'memberManagement', url: '/memberManagement', icon: Setting},
        {name: '权限管理', code: 'permissionsManagement', url: '/permissionsManagement', icon: Setting},
    ]

    const navItems:any = navArr.filter(i => {
        if (nav.includes(i.code) || i.code === 'index') {
            return i
        }
    })
    store.setRoutes(navItems)
}

export const getUser = async ()=>{
    await userSearch({id:user.value.id}).then((res: any) => {
        store.setUser(res.data)
    })
}

export const getStudentList = async () => {
    await studentApi.getStudentList().then((res:any)=>{
        store.setStudentList(res.data)
    })
}

export const getUserList = async () => {
    await userApi.userList().then((res:any)=>{
        store.setUserList(res.data)
    })
}