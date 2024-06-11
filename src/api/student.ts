import http from "../utils/request.ts";

const getStudentList = async () => {
    return await http.request('get','/student/list')
}

const getSearchStudent = async (data?:any) => {
    return await http.request('get','/student/search',data)
}

const removeStudent = async (id:number) => {
    return await http.request('delete',`/student/remove`,{id})
}

const editStudent = async (data:any) => {
    return await http.request('post',`/student/edit`,data)
}

const addStudent = async (data:any) => {
    return await http.request('post',`/student/add`,data)
}

export {getStudentList,getSearchStudent,removeStudent,editStudent,addStudent}