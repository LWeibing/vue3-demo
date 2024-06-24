<script setup lang="ts">
import * as Echarts from 'echarts'
import {onMounted, ref} from "vue";
import {mainStore} from "@/store";

const ageChart = ref(null)


onMounted(() => {
  const store = mainStore()
  const myChart = Echarts.init(ageChart.value)
  const studentList = store.studentList
  const age = Array.from({length: 19}, (_, i) => i + 6)
  let ageInfo:any = {}
  age.map((i)=>{
    ageInfo[i] = 0
  });

  studentList.map((item: any) => {
    ageInfo[item.age] ++
  })

  console.log(Object.values(ageInfo), 'asds');

  myChart.setOption({
    title:{
      text:'学员年龄统计',
      left:'center',
    },
    xAxis: {
      type: 'category',
      data: Object.keys(ageInfo)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: Object.values(ageInfo),
        type: 'line'
      }
    ],
    tooltip:{
      show: true,
    }
  })
})

</script>

<template>
  <main ref="ageChart" class="ageChart">

  </main>
</template>

<style scoped lang="scss">
.ageChart {
  width: 50%;
  height: 500px;
}
</style>