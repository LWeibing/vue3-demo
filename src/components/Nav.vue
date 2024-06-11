<script setup lang="ts">
import {useMenu} from '../models/useMenu.ts'
import NavItems from "./NavItems.vue";
import {mainStore} from "@/store";
import {ref, watch} from "vue";

// const {navItems} = useMenu()

const store = mainStore()

</script>

<template>
  <el-menu
      default-active="/index"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="rgba(250,250,250,0.65)"
      active-text-color="#fff"
      router
  >
    <NavItems v-for="item in store.routes" :key="item.code" :item="item"/>
  </el-menu>
</template>

<style scoped>

</style>