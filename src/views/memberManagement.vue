<script setup lang="ts">
  import {userList} from "@/api/user.ts";
  import {onMounted, ref} from "vue";
  import {IUser} from "@/models";

  const list = ref<IUser[]>([])

  onMounted(()=>{
    getUserList()
  })

  const getUserList = async () => {
    await userList().then((res:any) => {
      list.value = res.data
    })
  }
</script>

<template>
  <el-table :data="list" border>
    <el-table-column prop="id" label="ID"/>
    <el-table-column prop="phone" label="手机号"/>
    <el-table-column prop="username" label="用户名"/>
    <el-table-column prop="email" label="邮箱"/>
  </el-table>
</template>

<style scoped lang="scss">

</style>