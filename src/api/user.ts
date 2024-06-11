import http from "../utils/request.ts";

const userList = async () => {
    return await http.request('get','/user/list')
}

const userSearch = async (data?:any) => {
    return await http.request('get','/user/search',data)
}

const editUser = async (data:any) => {
    return await http.request('post',`/user/edit`,data)
}

export {userList,editUser,userSearch}