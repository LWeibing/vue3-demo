<script setup lang="ts">
import {useRoute} from 'vue-router'
import {onMounted, ref, watch} from "vue";

const route = useRoute()
const breadList = ref<any[]>([])

onMounted(() => {
  getMatched()
})

watch(() => route.path, () => {
  breadList.value = route.matched.filter(i => {
    if (i.path === '/home') return
    return {name: i.name, path: i.path}
  })
})

const getMatched = () => {
  breadList.value = route.matched.filter(i => {
    if (i.path === '/home') return
    return {name: i.name, path: i.path}
  })
}
</script>

<template>
  <el-breadcrumb separator="/">
    <!--    <el-breadcrumb-item :to="{ path: '/index' }">-->
    <!--      首页-->
    <!--    </el-breadcrumb-item>-->
    <template v-for="(item) in breadList">
      <el-breadcrumb-item :to="item.path">
        {{ item.name }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped lang="scss">

</style>