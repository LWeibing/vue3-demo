import http from "../utils/request.ts";

const login = async (data:any) => {
    return await http.request('post',`/login`,data)
}

export {login}