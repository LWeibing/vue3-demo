<script setup lang="ts">
import Breadcrumb from "@/components/Breadcrumb.vue";
import {mainStore} from "@/store";
import {useRouter} from "vue-router";
import {ref, watch} from "vue";

const store = mainStore()
const router = useRouter()
const onLoginOut = () => {
  store.user = {}
  store.token = ''
  router.push('/login')
}
const IKey = ref('')

watch(store.user.function.nav, () => {
  IKey.value = new Date()
}, {deep: true})

</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="aside">
        <Nav :key="IKey"/>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div></div>
          <div>
            {{ store.user.username }}
            <el-button type="primary" @click="onLoginOut">退登</el-button>
          </div>
        </el-header>
        <div class="breadcrumb">
          <Breadcrumb/>
        </div>
        <el-main class="layout_main">
          <div class="wrapper">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;

  .aside {
    width: 150px;
    height: 100vh;
    background-color: #001529;
  }

  .header {
    height: 42px;
    line-height: 42px;
    background-color: #fff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .05);
    display: flex;
    justify-content: space-between;
  }

  .breadcrumb {
    padding-top: 10px;
    padding-left: 20px;
  }

  .layout_main {
    min-width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 10px;

    .wrapper {
      box-sizing: border-box;
      background-color: white;
      width: 100%;
      padding: 16px;
      min-height: 100%;
    }
  }
}
</style>