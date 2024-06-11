interface INavMenu {
    name: string;
    url: string;
    icon?: any;
}

interface INavMenus {
    code?:string;
    name: string;
    url: string;
    icon?: any;
    children?: INavMenu[];
}

interface IStudentData {
    id: number;
    name: string;
    age: number;
    gender: string;
}

interface IUser {
    id: number,
    password: string,
    email: string,
    role: string,
    username: string,
    token: string,
    phone: string,
    function:{}
}

interface IRole{
    name:string,
    code:string,
    Children:IRole
}

export type {INavMenu, INavMenus, IStudentData,IUser,IRole}