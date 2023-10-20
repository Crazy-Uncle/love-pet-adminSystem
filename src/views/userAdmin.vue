<template>
  <div class="userAdmin">
    <div class="header">
      <div class="box">
        <el-input
          v-model="input"
          class="w-50 m-2"
          size="large"
          placeholder="输入要查找的用户"
          :suffix-icon="Search"
        />
        <el-button
          style="margin: 0 5px"
          type="primary"
          :icon="Search"
          @click="search"
          >搜索</el-button
        >
        <el-button style="margin: 0" type="info" @click="rest">
          <el-icon><Refresh /></el-icon>
          重置</el-button
        >
      </div>
    </div>
    <el-table :data="list" stripe style="width: 100%" border>
      <el-table-column prop="id" label="id" width="180" align="center" />
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
        align="center"
      />
      <el-table-column
        prop="nickname"
        label="昵称"
        width="180"
        align="center"
      />
      <el-table-column
        prop="password"
        label="密码"
        width="230"
        align="center"
      />

      <el-table-column prop="sex" label="性别" width="80" align="center" />
      <el-table-column prop="age" label="年龄" width="80" align="center" />
      <el-table-column prop="email" label="邮箱" width="180" align="center" />
      <el-table-column
        prop="address"
        label="家庭地址"
        width="200"
        align="center"
      />
      <el-table-column
        prop="register"
        label="注册日期"
        width="200"
        align="center"
      />
      <el-table-column label="账户余额（元）" width="200" align="center">
        <template #default="scope">
          {{ scope.row.money.toFixed(2) + '元' }}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="460"
        align="center"
        #default="scope"
        class="edit"
        fixed="right"
      >
        <span
          ><el-button type="danger" round @click="del(scope.row)"
            ><el-icon><DeleteFilled /></el-icon> 删除用户</el-button
          ></span
        >
        <span
          ><el-button type="info" round @click="change(scope.row)"
            ><el-icon><Edit /></el-icon> 修改密码</el-button
          >
        </span>

        <span>
          <el-popover placement="right" :width="800" trigger="click">
            <template #reference>
              <el-button type="warning" round @click="checkOrder(scope.row)"
                ><el-icon><Tickets /></el-icon> 订单记录</el-button
              >
            </template>
            <el-table :data="orderList">
              <!-- <el-table-column width="150" property="cover" label="宠物">
              </el-table-column> -->

              <el-table-column
                width="150"
                property="shop"
                label="名称"
                align="center"
              />
              <el-table-column width="100" label="单价（元）" align="center">
                <template #default="scope">
                  {{ scope.row.price.toFixed(2) }}
                </template>
              </el-table-column>
              <el-table-column
                width="300"
                property="num"
                label="数量"
                align="center"
              />
              <el-table-column width="300" label="总价（￥）" align="center">
                <template #default="scope">
                  {{ scope.row.money.toFixed(2) }}
                </template>
              </el-table-column>
              <el-table-column
                width="300"
                property="date"
                label="购买日期"
                align="center"
              />
            </el-table>
          </el-popover>
        </span>
        <el-button round type="primary" @click="recharge(scope.row)"
          ><el-icon><Money /></el-icon> 余额充值</el-button
        >
      </el-table-column>
    </el-table>

    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="queryInfo.pageNum"
        v-model:page-size="queryInfo.pageSize"
        :page-sizes="[10]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserList, adminUserSearch } from '@/utils/get'
import {
  delAdminUser,
  changeUserPassword,
  checkAdminUser,
  log,
  topUpd
} from '@/utils/post'
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
// console.log(route.path)

const queryInfo = ref({
  pageNum: 1,
  pageSize: 10
})
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const input = ref('')
const list = ref<Array<object>>()
const total = ref(0)

const orderList: any = ref([])
// 获取表单数据
const getList = (params: any) => {
  getUserList(params).then((res) => {
    if (res.data.status === 200) {
      list.value = res.data.data
      total.value = res.data.total
      // console.log(list.value)
    }
  })
}
getList({
  pageNum: queryInfo.value.pageNum,
  pageSize: queryInfo.value.pageSize
})

// 搜索
const search = () => {
  adminUserSearch({ username: input.value }).then((res) => {
    if (res.data.status === 200) {
      list.value = res.data.data
      total.value = res.data.total

      if (route.path === '/user') {
        log({
          username: localStorage.getItem('username'),
          log: '在用户管理页面对' + input.value + '进行了搜索操作'
        }).then((res) => {
          if (res.data.status === 200) {
            // console.log('记录成功')
          } else {
            // console.log('记录失败')
          }
        })
      }
    } else {
      ElMessage({ message: '未找到此用户', type: 'warning', duration: 1000 })
    }
  })
}

// 重置
const rest = () => {
  location.reload()
  input.value = ''
  if (route.path === '/user') {
    log({
      username: localStorage.getItem('username'),
      log: '在用户管理页进行了重置操作'
    }).then((res) => {
      if (res.data.status === 200) {
        // console.log('记录成功')
      } else {
        // console.log('记录失败')
      }
    })
  }
}

const handleSizeChange = (val: number) => {
  // console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  queryInfo.value.pageNum = val
  getList({
    pageNum: queryInfo.value.pageNum,
    pageSize: queryInfo.value.pageSize
  })
  // console.log(`current page: ${val}`)
}

const del = (val: any) => {
  delAdminUser({ username: val.username }).then((res: any) => {
    if (res.data.status === 200) {
      ElMessage({ message: '删除成功', type: 'success', duration: 500 })

      getList({
        pageNum: queryInfo.value.pageNum,
        pageSize: queryInfo.value.pageSize
      })
      if (route.path === '/user') {
        log({
          username: localStorage.getItem('username'),
          log: '在用户管理页对' + val.username + '进行了删除账户操作'
        }).then((res) => {
          if (res.data.status === 200) {
            // console.log('记录成功')
          } else {
            // console.log('记录失败')
          }
        })
      }
    } else {
      ElMessage({ message: '删除失败', type: 'error', duration: 500 })
    }
  })
  // console.log(val.username)
}

const change = (val: any) => {
  // console.log(val)

  ElMessageBox.prompt('请输入您要修改的密码', '提示', {
    confirmButtonText: '提交',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      changeUserPassword({ username: val.username, password: value }).then(
        (res) => {
          if (res.data.status === 200) {
            if (route.path === '/user') {
              log({
                username: localStorage.getItem('username'),
                log: '在用户管理页面对' + val.username + '进行了修改密码操作'
              }).then((res) => {
                if (res.data.status === 200) {
                  // console.log('记录成功')
                } else {
                  // console.log('记录失败')
                }
              })
            }
            ElMessage({ type: 'success', message: '修改成功', duration: 500 })
          } else {
            ElMessage({ type: 'error', message: '修改失败', duration: 500 })
          }
        }
      )
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消修改'
      })
    })
}

interface met {
  val: object
  username: object
}
const checkOrder = (val: met) => {
  // console.log(val.username)

  checkAdminUser({ username: val.username }).then((res) => {
    if (res.data.status === 200) {
      // console.log(res.data.data)

      orderList.value = res.data.data
      if (route.path === '/user') {
        log({
          username: localStorage.getItem('username'),
          log: '在用户管理页对' + val.username + '进行了查看订单记录操作'
        }).then((res) => {
          if (res.data.status === 200) {
            // console.log('记录成功')
          } else {
            // console.log('记录失败')
          }
        })
      }
    }
  })
}

interface k {
  id: number
}
const recharge = (val: k) => {
  ElMessageBox.prompt('请输入要充值的金额', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      topUpd({ id: val.id, money: parseInt(value) }).then((res) => {
        if (res.data.status === 200) {
          ElMessage({ message: '充值成功', type: 'success', duration: 1000 })
          getList({
            pageNum: queryInfo.value.pageNum,
            pageSize: queryInfo.value.pageSize
          })
        } else {
          ElMessage({ message: '充值失败', type: 'warning', duration: 1000 })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消充值'
      })
    })
}
</script>

<style scoped lang="less">
.userAdmin {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  // background-color: aquamarine;

  .active {
    background-color: red;
  }
  .header {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: blueviolet;

    .box {
      .el-input {
        width: 180px;
        height: 40px;
      }
      .el-button {
        height: 40px;
      }
    }
  }

  .el-table {
    // width: 50%;
    height: 530px;
    .el-table__inner-wrapper {
      width: 100%;
      height: 100%;

      .el-table__header-wrapper {
        display: flex;
        justify-content: center;
      }

      .edit {
        display: flex;
      }
    }
  }

  .el-pagination {
  }
  .demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
  }
  .demo-pagination-block .demonstration {
    margin-bottom: 16px;
  }
}
</style>
