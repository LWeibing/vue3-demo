<script setup lang="ts">
import Age from "@/views/echat/age.vue";
import {mainStore} from "@/store";
import Gender from "@/views/echat/gender.vue";

const store = mainStore()
console.log(store.studentList.length,'sf14w84wf');
</script>

<template>
  <main class="main">
    <Age v-if="store.studentList.length"/>
    <Gender v-if="store.studentList.length"/>
  </main>
</template>

<style scoped>
.main{
  display: flex;
}
</style>