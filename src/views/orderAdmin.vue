<template>
  <div class="order">
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="id" label="编号" align="center" width="80" />
      <el-table-column
        prop="shop"
        label="商品名称"
        align="center"
        width="180"
      />

      <el-table-column prop="cover" label="商品信息" align="center" width="180">
        <template v-slot="scope">
          <el-image
            :src="scope.row.cover"
            alt=""
            style="width: 120px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>

      <el-table-column label="单价（元）" align="center" width="120">
        <template #default="scope">
          {{ scope.row.price.toFixed(2) + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="num" label="购买数量" align="center" width="80" />
      <el-table-column label="实付金额（元）" align="center" width="120">
        <template #default="scope">
          {{ scope.row.money.toFixed(2) + '元' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        sortable
        label="创建时间"
        align="center"
        width="180"
      />

      <el-table-column
        prop="addressMessage"
        label="收货地址"
        align="center"
        width="180"
      />
      <el-table-column
        prop="infoAddress"
        label="详细收货地址"
        align="center"
        width="180"
      />
      <el-table-column
        prop="postalCode"
        label="邮编"
        align="center"
        width="80"
      />
      <el-table-column
        prop="consignee"
        label="收货人"
        align="center"
        width="80"
      />
      <el-table-column prop="phone" label="手机号" align="center" width="180" />
      <el-table-column
        prop="status"
        label="订单状态"
        align="center"
        width="120"
      />
      <el-table-column label="操作" align="center" width="350" fixed="right">
        <template #default="scope">
          <el-button
            type="warning"
            @click="send(scope.row), (dialogVisible = flag)"
            ><el-icon><Van /></el-icon> 发货</el-button
          >
          <el-button type="danger" @click="del(scope.row)"
            ><el-icon><DeleteFilled /></el-icon> 删除订单</el-button
          >
          <el-button
            type="info"
            @click="detail(scope.row), (dialogVisible1 = true)"
            ><el-icon><Tickets /></el-icon> 详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="queryInfo.pageNum"
      v-model:page-size="queryInfo.pageSize"
      :page-sizes="[10]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="40%"
      height="200px"
      :before-close="handleClose"
    >
      <div>
        <span>快递公司：</span>
        <el-select
          v-model="value"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </div>
      <div class="info">
        <span>物流单号：</span>
        <el-input v-model="input" placeholder="请输入物流单号" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="confirm(), (dialogVisible = false)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 打开详情 -->
    <el-dialog
      v-model="dialogVisible1"
      title="详情"
      width="50%"
      :before-close="handleClose1"
    >
      <el-descriptions
        title="收货人信息"
        :column="2"
        :size="size"
        border
        direction="horizontal"
        :style="blockMargin"
        v-for="item in list"
        :key="item.id"
      >
        <el-descriptions-item label="收货人：" align="center">
          {{ item.consignee }}
          <!-- {{ list[0]['consignee'] }} -->
        </el-descriptions-item>
        <el-descriptions-item label="电话：" align="center">
          <!-- {{ list[0]['phone'] }} -->
          {{ item.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="收货地址：" align="center">
          {{ item.addressMessage }}
        </el-descriptions-item>
        <el-descriptions-item label="详细地址：" align="center">
          {{ item.infoAddress }}
        </el-descriptions-item>

        <el-descriptions-item label="邮政编码" align="center">
          <!-- {{ list[0]['postalCode'] }} -->
          {{ item.postalCode }}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions
        title="配送信息"
        :column="2"
        :size="size"
        border
        direction="horizontal"
        :style="blockMargin"
        v-for="item in list"
        :key="item.id"
      >
        <el-descriptions-item label="物流单号" align="center">
          <!-- {{ list[0]['numbers'] }} -->
          {{ item.numbers }}
        </el-descriptions-item>
        <el-descriptions-item label="送货方式" align="center"
          >普通快递</el-descriptions-item
        >
        <el-descriptions-item label="快递公司" align="center">
          <!-- {{ list[0]['express'] }} -->
          {{ item.express }}
        </el-descriptions-item>
      </el-descriptions>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">关闭</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getOrderList, shipments, log } from '@/utils/post'
import { getDetail, delOrders } from '@/utils/get'

import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()

const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const tableData = ref()
const queryInfo = ref({
  pageNum: 1,
  pageSize: 10,
  total: 5
})

interface k {
  id: number
  consignee: string
  phone: string
  postalCode: string
  numbers: string
  express: string
  infoAddress: string
  addressMessage: string
}
const list = ref<Array<k>>([])

const flag = ref(false)
const ordersId = ref(0)
const value = ref('')
const options = ref([
  {
    id: 1,
    label: '圆通快递'
  },
  {
    id: 2,
    label: '顺丰快递'
  },
  {
    id: 3,
    label: '中通快递'
  },
  { id: 4, label: '申通快递' },
  { id: 5, label: '韵达快递' }
])
const input = ref('')

const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const size = ref('')
const blockMargin = computed(() => {
  const marginMap = {
    large: '50px',
    default: '28px',
    small: '24px'
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default
  }
})

const detail = (val: any) => {
  // console.log(val)

  getDetail({ id: val.id }).then((res) => {
    if (res.data.status === 200) {
      list.value = res.data.data
      log({
        username: localStorage.getItem('username'),
        log: '查看了收货人：' + val.consignee + '的快递详情信息'
      }).then((res) => {
        if (res.data.status === 200) {
          // console.log('记录成功')
        } else {
          // console.log('记录失败')
        }
      })
    }
  })
  // console.log()
}

// 删除订单
const del = (val: any) => {
  // console.log()

  delOrders({ id: val.id }).then((res) => {
    if (res.data.status === 200) {
      ElMessage({ message: '删除成功', type: 'success', duration: 500 })
      if (route.path === '/order') {
        log({
          username: localStorage.getItem('username'),
          log: '在订单页面对' + val.consignee + '进行了删除订单操作'
        }).then((res) => {
          if (res.data.status === 200) {
            // console.log('记录成功')
          } else {
            // console.log('记录失败')
          }
        })
      }
      getData()
    } else {
      ElMessage({ message: '删除失败', type: 'warning', duration: 500 })
    }
  })
}

const handleClose1 = (done: () => void) => {
  ElMessageBox.confirm('你确定要关闭这个窗口?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('你确定要关闭这个窗口?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const handleSizeChange = (val: number) => {
  queryInfo.value.pageSize = val
  // console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  queryInfo.value.pageNum = val
  getData()
  // console.log(`current page: ${val}`)
}

const consignee = ref()
const confirm = () => {
  if (!value.value || !input.value) {
    ElMessage({
      message: '请填写快递快递公司与物流单号',
      type: 'warning',
      duration: 1000
    })
  } else {
    shipments({
      id: ordersId.value,
      express: value.value,
      numbers: input.value
    }).then((res) => {
      if (res.data.status === 200) {
        ElMessage({ message: '发货成功', type: 'success', duration: 500 })
        log({
          username: localStorage.getItem('username'),
          log: '在订单页面对收货人：' + consignee.value + '进行了发货操作'
        }).then((res) => {
          if (res.data.status === 200) {
            // console.log('记录成功')
          } else {
            // console.log('记录失败')
          }
        })
        getData()
      } else {
        ElMessage({ message: '发货失败', type: 'warning', duration: 500 })
      }
    })
  }
}

const getData = () => {
  getOrderList({
    pageNum: queryInfo.value.pageNum,
    pageSize: queryInfo.value.pageSize
  }).then((res) => {
    if (res.data.status === 200) {
      tableData.value = res.data.data
      queryInfo.value.total = res.data.total
    }
  })
}

getData()

const send = (val: any) => {
  // console.log(val)

  consignee.value = val.consignee

  if (val.status === '已发货') {
    flag.value = false

    ElMessage({
      message: '订单已发货请勿重复操作',
      type: 'warning',
      duration: 500
    })
  } else {
    flag.value = true
    ordersId.value = val.id
  }

  // console.log(val.id)
}
</script>

<style scoped lang="less">
.order {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .el-table {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .info {
    display: flex;

    .el-input {
      width: 222px;
      height: 40px;
    }
  }

  .el-descriptions {
    margin-top: 20px;
  }
}
</style>
