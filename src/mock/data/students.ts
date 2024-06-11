import Mock from 'mockjs'

//创建学员假数据
let students: any[] = []

for (let i: number = 0; i < 30; i++) {
    students.push(Mock.mock({
            id: '@increment',
            name: '@cname',
            age: '@integer(6, 24)',
            'gender|1': ['M', 'F'],
        })
    )
}

//获取全部学员
Mock.mock('/student/list', 'get', () => {
    return {code: 200, message: '获取成功', total: students.length, data: students}
})

//分页获取学员
Mock.mock('/student/search', 'get', (option: any) => {
    let info = JSON.parse(option.body)
    if (!info.pageNum) {
        info.pageNum = 1;
    }
    if (!info.pageSize) {
        info.pageSize = 10;
    }
    let newStudents: any[] = []
    let newArr: any[] = []
    if (students.length > 0) {
        let pageNum = (info.pageNum - 1) * info.pageSize
        let num = info.pageNum * info.pageSize
        for (let i = 0; i < students.length; i++) {
            if (info.searchKey && Object.keys(info.searchKey).length > 0) {
                for (const item in info.searchKey) {
                    if (item && (students[i][item] == info.searchKey[item])) {
                        newStudents.push(students[i])
                    }
                }
            } else {
                newStudents.push(students[i])
            }
        }
        for (let i = pageNum; i < num; i++) {
            if (newStudents[i] != undefined) {
                newArr.push(newStudents[i])
            }
        }
    }
    return {code: 200, message: '获取成功', total: newStudents.length, data: newArr}
})

//删除学员
Mock.mock(`/student/remove`, 'delete', (option: any) => {
    let {id} = JSON.parse(option.body)
    for (let i: number = 0; i < students.length; i++) {
        if (students[i].id == id) {
            students.splice(i, 1)
        }
    }
    return {code: 200, message: '删除成功'}
})

//修改学员
Mock.mock(`/student/edit`, 'post', (option: any) => {
    let info = JSON.parse(option.body)
    for (let i: number = 0; i < students.length; i++) {
        if (students[i].id == info.id) {
            students.splice(i, 1, info)
        }
    }
    return {code: 200, message: '修改成功'}
})

//修改学员
Mock.mock(`/student/add`, 'post', (option: any) => {
    let info = JSON.parse(option.body)
    students.push({...info, id: students.length + 1})
    return {code: 200, message: '添加成功'}
})

// export default students