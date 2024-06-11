<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {addStudent, editStudent, getSearchStudent, removeStudent} from "../api/student.ts";
import {IStudentData} from "../models";
import {
  Edit,
  Delete,
  Plus
} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from "element-plus";
import {mainStore} from "@/store";

const formLabelWidth = '100px'
const store = mainStore()
const userFunction = store.user.function.student
const list = ref<IStudentData[]>([])
const dialogVisible = ref(false)
const actionType = ref('')
let pageInfo = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const searchKey = reactive({})

const form = ref<IStudentData>({
  id: 0,
  name: '',
  age: 0,
  gender: ''
})
onMounted(() => {
  getStudent()
})

watch(searchKey, () => {
  getStudent()
})

const getStudent = async () => {
  await getSearchStudent({...pageInfo, searchKey}).then((res: any) => {
    list.value = res.data
    pageInfo.total = res.total
  })
}

const onPageChange = (pageNum: number) => {
  pageInfo.pageNum = pageNum
  getStudent()
}

const onSizeChange = (pageNum: number) => {
  pageInfo.pageSize = pageNum
  getStudent()
}

const onRemove = (id: number) => {
  ElMessageBox.confirm(
      '请确认是否删除该学员？',
      '删除确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(async () => {
    await removeStudent(id).then((res: any) => {
      ElMessage({
        message: res.message,
        type: 'success',
      })
      getStudent()
    })
  }).catch(() => {
    ElMessage({
      message: '已取消操作',
      type: 'info',
    })
  })
}

const onSelectItem = (item: IStudentData) => {
  actionType.value = 'edit'
  form.value = item
  dialogVisible.value = true
}

const onEdit = async () => {
  await editStudent(form.value).then((res: any) => {
    ElMessage({
      message: res.message,
      type: 'success',
    })
    dialogVisible.value = false
    getStudent()
  })
}

const onAdd = async () => {
  await addStudent(form.value).then((res: any) => {
    ElMessage({
      message: res.message,
      type: 'success',
    })
    dialogVisible.value = false
    getStudent()
  })
}

const onAddStudent = () => {
  actionType.value = 'add'
  dialogVisible.value = true
}

const onCancel = () => {
  form.value = {}
  dialogVisible.value = false
}

const getFunction = (type:string) => {
  return !!userFunction.includes(type);
}

</script>

<template>
  <div class="filter_box">
    <label>
      性别：
      <el-select
          clearable
          v-model="searchKey.gender"
          filterable
          placeholder="请选择性别"
          style="width: 240px"
      >
        <el-option value="M" label="男"/>
        <el-option value="F" label="女"/>
      </el-select>
    </label>
    <el-button :icon="Plus" @click="onAddStudent" v-if="getFunction('add')">添加学员</el-button>
  </div>
  <el-table :data="list" border>
    <el-table-column prop="id" label="ID"/>
    <el-table-column prop="name" label="姓名"/>
    <el-table-column prop="age" label="年龄"/>
    <el-table-column prop="gender" label="性别">
      <template #default="scope">
        <div>{{ scope.row.gender === 'M' ? '男' : '女' }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="action" label="操作">
      <template #default="scope">
        <el-button type="primary" :icon="Edit" @click="onSelectItem(scope.row)" v-if="getFunction('edit')">编辑</el-button>
        <el-button type="danger" :icon="Delete" @click="onRemove(scope.row.id)" v-if="getFunction('remove')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="page_box">
    <el-pagination
        small
        background
        layout="total,sizes,prev, pager, next,jumper"
        :total="pageInfo.total"
        class="mt-4"
        :hide-on-single-page="pageInfo.total > 10"
        @current-change="onPageChange"
        @size-change="onSizeChange"
    />
  </div>
  <el-dialog v-model="dialogVisible" width="500" @close="onCancel">
    <template #header>
      <div class="dialog-header">{{actionType==='edit'? '修改学员':'添加学员'}}</div>
    </template>
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input-number v-model="form.age" :min="1"/>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio-group v-model="form.gender" class="ml-4">
          <el-radio value="M" size="large">男</el-radio>
          <el-radio value="F" size="large">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onEdit" v-if="actionType==='edit'">
          确认
        </el-button>
        <el-button type="primary" @click="onAdd" v-else>
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.page_box {
  background-color: white;
  display: flex;
  justify-content: center;
  height: 40px;
  margin-top: 6px;
}

.dialog-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter_box {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
}
</style>