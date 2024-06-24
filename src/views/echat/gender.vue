<script setup lang="ts">
import {mainStore} from "@/store";
import * as Echarts from "echarts";
import {onMounted, ref} from "vue";

const genderChart = ref(null)
const store = mainStore()

onMounted(() => {
  const myChart = Echarts.init(genderChart.value)
  const studentList = store.studentList

  const genderInfo:any[] = [{name: '男', value: 0, code: 'M'}, {name: '女', value: 0, code: 'F'}]

  studentList.map((item: any) => {
    genderInfo.find(i => i.code === item.gender).value++;
  })

  console.log(genderInfo,'genderInfo');

  myChart.setOption({
    title: {
      text: '学员男女比例',
      left:'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '6%',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: genderInfo
      }
    ]
  })
})
</script>

<template>
  <main ref="genderChart" class="genderChart">

  </main>
</template>

<style scoped lang="scss">
.genderChart {
  width: 50%;
  height: 500px;
}
</style>