import http from "../utils/request.ts";

const roleList = async (data:any) => {
    return await http.request('get',`/role/list`,data)
}

export {roleList}