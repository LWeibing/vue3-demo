import Mock from "mockjs";

const roles: any[] = []

roles.push(Mock.mock({
    children: [
        {code: 'studentManagement', name: '学员管理'},
        {code: 'memberManagement', name: '成员管理'},
        {code: 'permissionsManagement', name: '权限管理'}
    ],
    code: 'nav',
    name: '导航'
}))

roles.push(Mock.mock({
    children: [
        {code: 'add', name: '添加学员'},
        {code: 'edit', name: '编辑学员'},
        {code: 'remove', name: '删除学员'},
    ],
    code: 'student',
    name: '学员'
}))

Mock.mock('/role/list', 'get', () => {
    return {code: 200, message: '获取成功', data: roles}
})