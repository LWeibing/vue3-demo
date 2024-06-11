import Mock from "mockjs";

export const user: any[] = []

Mock.Random.extend({
    phone: function () {
        let phonePrefixs = ['139', '138', '137', '136', '135', '134', '159', '158', '157', '150', '151', '152']
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/g)  //Number()
    }
})

user.push(Mock.mock({
        id: 0,
        password: '',
        email: 'admin@example.com',
        role: 'admin',
        username: 'admin',
        token: '@string',
        phone: '@phone',
        function: {
            // 'nav.studentManagement': true,
            // 'nav.memberManagement': true,
            // 'nav.permissionsManagement': true,
            // 'student.add': true,
            // 'student.edit': true,
            // 'student.remove': true,
            nav: [
                'studentManagement',
                'memberManagement',
                'permissionsManagement'
            ],
            student: [
                'add',
                'edit',
                'remove',
            ]
        }
    })
)

user.push(Mock.mock({
        id: 1,
        password: '',
        email: 'vip@example.com',
        role: 'vip',
        username: 'vip',
        token: '@string',
        phone: '@phone',
        function: {
            // 'nav.studentManagement': true,
            // 'nav.memberManagement': true,
            // 'student.add': true,
            // 'student.edit': true,
            nav: [
                'studentManagement',
                'memberManagement',
            ],
            student: [
                'add',
                'edit',
            ]
        }
    })
)

user.push(Mock.mock({
        id: 2,
        password: '',
        email: 'user@example.com',
        role: 'user',
        username: 'user',
        token: '@string',
        phone: '@phone',
        function: {
            // 'nav.studentManagement': true,
            // 'student.add': true,
            nav: ['studentManagement'],
            student: ['add']
        }
    })
)

const match = (info: any) => {
    switch (info.username) {
        case 'admin':
            return info.password === '123456' ? 1 : 0
        case 'vip':
            return info.password === '12345' ? 2 : 0
        case 'user':
            return info.password === '1234' ? 3 : 0
        default:
            break
    }
}

//登录
Mock.mock('/login', 'post', (option) => {
    let info = JSON.parse(option.body)
    let isMatch: number | undefined = match(info)
    if (isMatch) {
        return {code: 200, message: '登录成功', data: user[isMatch - 1]}
    } else {
        return {code: 401, message: '用户名或密码错误'}
    }

})

//获取用户
Mock.mock('/user/list', 'get', () => {
    return {code: 200, message: '获取成功', total: user.length, data: user}
})

//获取用户
Mock.mock('/user/search', 'get', (option: any) => {
    let info = JSON.parse(option.body)
    const item = user.find(i=> i.id===info.id)
    return {code: 200, message: '获取成功', data: item}
})

//修改用户
Mock.mock(`/user/edit`, 'post', (option: any) => {
    let info = JSON.parse(option.body)
    for (let i: number = 0; i < user.length; i++) {
        if (user[i].id == info.id) {
            user.splice(i, 1, info)
        }
    }
    return {code: 200, message: '修改成功'}
})
