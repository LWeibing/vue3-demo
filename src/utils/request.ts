import axios, {type AxiosRequestConfig, AxiosResponse} from "axios";
import {mainStore} from "../store";
import {storeToRefs} from "pinia";

const store = mainStore()

//请求拦截器
axios.interceptors.request.use((config: AxiosRequestConfig | any) => {
    const {token} = storeToRefs(store)
    if(token) {
        config.headers['token'] = token.value
    }
    return config
})

//响应拦截器
axios.interceptors.response.use((res: AxiosResponse | any) => {
    return res.data
}, (err: any) => {
    return Promise.reject(err)
})

//输入或返回数据类型的定义
interface IHttp {
    request<T>(method: string, url: string, params?: unknown):Promise<T>
}

const http:IHttp = {
    request(method, url, params) {
        return axios({
            method,
            url,
            data:params
        })
    }
}

export default http