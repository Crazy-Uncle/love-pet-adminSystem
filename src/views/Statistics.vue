<template>
  <div class="count">
    <el-card class="box-card" shadow="hover">
      <div style="width: 550px; height: 520px" ref="main"></div>
      <div style="width: 600px; height: 520px" ref="radio"></div>
      <div style="width: 1000px; height: 400px" ref="chartDom"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { countOrder, countWholeOrder, countPrice } from '@/utils/get'

// 获取特价商品总销量
const initTotal = ref()
// 获取特价商品销量
const getInit = async () => {
  await countOrder().then((res) => {
    if (res.data.status === 200) {
      list.value = res.data.data
      initTotal.value = res.data.money
    }
  })
  initChart()
}
// 特价销量数据存储列表
const list = ref()

const main = ref()
// 特价销量饼图
const initChart = () => {
  const myChart = echarts.init(main.value)

  const option = ref({
    title: {
      text: '特价商品销量',
      subtext: '总销量：' + initTotal.value,

      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '商品名称',
        type: 'pie',
        radius: '50%',
        data: list.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })

  option.value && myChart.setOption(option.value)
}
// 常规商品总销量
const wholeTotal = ref()
const wholeList = ref()
// 获取常规商品销量
const getWholeList = async () => {
  await countWholeOrder().then((res) => {
    if (res.data.status === 200) {
      wholeList.value = res.data.data
      // console.log(wholeList)
      wholeTotal.value = res.data.money
    }
  })
  wholeChart()
}
const radio = ref()
// 获取常规商品销量饼图
const wholeChart = () => {
  const myChart = echarts.init(radio.value)

  const option = ref({
    title: {
      text: '常规商品销量',
      subtext: '总销量：' + wholeTotal.value,

      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '商品名称',
        type: 'pie',
        radius: '50%',
        data: wholeList.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })

  option.value && myChart.setOption(option.value)
}

const chartDom = ref()

const countPriceInit = () => {
  const myChart = echarts.init(chartDom.value)
  const option = ref({
    title: {
      text: '全部商品销售数据',
      left: 'center',
      subtext: '总销售额：' + money.value + '(元)'
    },
    legend: {},
    tooltip: {},
    dataset: {
      source: totalShop.value
    },
    xAxis: {},
    yAxis: { type: 'category' },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      {
        type: 'bar',
        encode: {
          tooltip: ['销售金额', '销量'],
          y: 'product'
        }
      }
    ]
  })
  option.value && myChart.setOption(option.value)
}
// 获取数据
const totalList = ref()
// 获取数据名称
const totalShop = ref()
// 总销售额
const money = ref()
// 获取全部商品销量总价
const totalInit = async () => {
  await countPrice().then((res) => {
    if (res.data.status === 200) {
      totalList.value = res.data.data
      totalShop.value = res.data.shop
      money.value = res.data.money
    }
  })
  countPriceInit()
}
onMounted(() => {
  // console.log('挂载完成')
  // console.log(kindLIst.value)
  getInit()
  getWholeList()
  totalInit()
})
</script>

<style scoped lang="less">
.count {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .box-card {
    width: 100%;
    /deep/.el-card__body {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
}
</style>
