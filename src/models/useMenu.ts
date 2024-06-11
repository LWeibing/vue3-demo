import {
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'
import {INavMenus} from "./index.ts";
import {mainStore} from "../store";
import {storeToRefs} from "pinia";


export const useMenu = () => {
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

    return {navItems}
}