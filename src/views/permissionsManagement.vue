<script setup lang="ts">
import {roleList} from "@/api/role.ts";
import {onMounted, ref} from "vue";
import {IRole, IUser} from "@/models";
import {editUser, userList} from "@/api/user.ts";
import type {TabsPaneContext} from 'element-plus'
import {mainStore} from "@/store";
import {useMenu} from "@/models/useMenu.ts";
import {getRoutes, getUser} from "@/utils/function.ts";

const list = ref<IRole>([])
const users = ref<IUser>([])
const activeName = ref([])
const editing = ref(false)
const userIndex = ref('0')
const userFunction = ref({})
const store = mainStore()

onMounted(() => {
  getUserList()
  getRoleList()
})

const getRoleList = async () => {
  await roleList().then((res: any) => {
    list.value = res.data
    activeName.value = res.data.map(i => i.code)
  })
}

const getUserList = async () => {
  await userList().then((res: any) => {
    users.value = res.data
    userFunction.value = res.data[0].function
  })
}

const onTabClick = (tab: TabsPaneContext, event: Event) => {
  userIndex.value = tab.index
  userFunction.value = users.value[tab.index].function
}

const onSave = async () => {
  const user = users.value[userIndex.value]
  user.function = userFunction.value
  await editUser(user).then(async () => {
    editing.value = false
    await getUser()
    await getRoutes()
    await getUserList()
  })
}

</script>

<template>
  <main class="main">
    <aside class="aside">
      <el-tabs tab-position="left" class="demo-tabs" @tab-click="onTabClick">
        <el-tab-pane v-for="item in users" :key="item.id" :label="item.username"></el-tab-pane>
      </el-tabs>
    </aside>
    <article class="article">
      <div style="margin-bottom: 20px">
        <el-button @click="editing = true">编辑</el-button>
        <el-button type="primary" @click="onSave" :disabled="!editing">保存</el-button>
      </div>
      <el-collapse v-model="activeName">
        <el-collapse-item v-for="(item,index) in list" :key="index" :name="item.code" :disabled="!editing">
          <template #title>
            {{ item.name }}
          </template>
          <el-checkbox-group :disabled="!editing" v-model="userFunction[item.code]">
            <el-checkbox v-for="(i,idx) in item.children" :key="idx" :label="i.name" :value="i.code"
                         :disabled="userIndex==='0' && i.code==='permissionsManagement'">
              {{ i.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
      </el-collapse>
    </article>
  </main>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  overflow: auto;
  display: flex;

  .aside {
    width: 200px;

    .demo-tabs {
      width: 80%;

      :deep(.el-tabs__header), :deep(.el-tabs__nav) {
        width: 100%;
      }

      :deep(.el-tabs__content) {
        display: none;
      }
    }
  }

  .article {
    flex: 1;
  }

}
</style>