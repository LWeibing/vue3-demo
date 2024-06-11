<script setup lang="ts">
import {defineProps} from 'vue'
import {INavMenus} from "../models";

const {item} = defineProps<{ item: INavMenus }>()

</script>

<template>
  <el-menu-item :index="item.url" v-if="!item.children">
    <el-icon>
      <component :is="item.icon"></component>
    </el-icon>
    <span>{{ item.name }}</span>
  </el-menu-item>
  <el-sub-menu index="item.url" v-else>
    <template #title>
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
    <NavItems v-for="v in item.children" :key="v.url" :item="v"/>
  </el-sub-menu>
</template>

<style scoped lang="scss">

</style>