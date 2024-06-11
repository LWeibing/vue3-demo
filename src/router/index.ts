import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import {mainStore} from "../store";

const routes:Array<RouteRecordRaw> = [
    { path: '/', redirect: '/login' },
    {
        path:'/login',
        name:'登录',
        component:()=>import('../views/login.vue')
    },
    {
        path:'/home',
        name:'首页',
        component:()=>import('../components/Layout.vue'),
        children:[
            {
                path:'/index',
                name:'首页',
                component:()=>import('../views/index.vue'),
            },
            {
                path:'/studentManagement',
                name:'学员管理',
                component:()=>import('../views/studentManagement.vue'),
            },
            {
                path:'/memberManagement',
                name:'成员管理',
                component:()=>import('../views/memberManagement.vue'),
            },
            {
                path:'/permissionsManagement',
                name:'权限管理',
                component:()=>import('../views/permissionsManagement.vue'),
            },
        ]
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.path==='/login'){
        next()
    }else {
        const store:any = mainStore()
        const homeRoutes:any = routes.filter((r:any) => r.path === '/home')[0]
        homeRoutes.children = []
        if(store.token) {
            next()
        }else {
            next({path:'/login'})
        }
    }
})

export default router