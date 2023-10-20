<template>
  <div class="super">
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
      <el-button style="margin: 0" type="info" @click="rest"
        ><el-icon><Refresh /></el-icon> 重置</el-button
      >
    </div>

    <el-table :data="list" stripe style="width: 100%" border>
      <el-table-column prop="id" label="Id" width="180" align="center" />
      <el-table-column
        prop="username"
        label="名称"
        width="180"
        align="center"
      />
      <el-table-column prop="password" label="密码" align="center" />

      <el-table-column
        width="180"
        prop="tab"
        label="身份标识（1表示超级管理员,0表示普通管理员）"
        align="center"
      />
      <el-table-column prop="register" label="注册日期" align="center" />
      <el-table-column label="操作" align="center" width="450" #default="scope">
        <el-button @click="change(scope.row)" type="warning"
          ><el-icon><EditPen /></el-icon> 修改密码</el-button
        >
        <el-button type="danger" @click="del(scope.row)"
          ><el-icon><DeleteFilled /></el-icon> 删除管理员</el-button
        >

        <el-popover placement="right" :width="800" trigger="click">
          <template #reference>
            <el-button
              type="info"
              style="margin-right: 16px"
              @click="checkLog(scope.row)"
              ><el-icon><ZoomIn /></el-icon> 查看操作记录</el-button
            >
          </template>
          <el-table :data="logList">
            <el-table-column
              width="80"
              property="id"
              label="id"
              align="center"
            />
            <el-table-column
              width="100"
              property="username"
              label="管理员"
              align="center"
            />
            <el-table-column
              width="150"
              property="date"
              label="操作时间"
              align="center"
            />
            <el-table-column
              width="300"
              property="log"
              label="日志记录"
              align="center"
            />
          </el-table>
          <el-pagination
            v-model:current-page="queryLog.pageNum"
            v-model:page-size="queryLog.pageSize"
            :page-sizes="[10]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryLog.total"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
          />
        </el-popover>
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
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import {
  getAdminList,
  upgrade,
  delAdmin,
  log,
  checkInfo,
  changeAdmin
} from '@/utils/post'

// import crypto from '@/utils/crypto'
import { searchAdmin } from '@/utils/get'
import { Search } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const queryLog = ref({ pageNum: 1, pageSize: 10, total: 0 })
const route = useRoute()
const queryInfo = ref({ pageNum: 1, pageSize: 10 })
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const list = ref([])
const input = ref('')
const logList = ref([])
const handleSizeChange = (val: number) => {
  queryInfo.value.pageSize = val
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

// 初始化
const getList = (params: object) => {
  getAdminList(params).then((res) => {
    if (res.data.status === 200) {
      total.value = res.data.total
      list.value = res.data.data
    }
  })
}
getList({
  pageNum: queryInfo.value.pageNum,
  pageSize: queryInfo.value.pageSize
})

const change = (val: any) => {
  ElMessageBox.prompt('请输入您要修改的密码', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '提交'
  })
    .then(({ value }) => {
      changeAdmin({ username: val.username, password: value }).then((res) => {
        if (res.data.status === 200) {
          if (route.path === '/super') {
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
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消修改'
      })
    })
}

const del = (val: any) => {
  ElMessageBox.confirm('您确定要删除吗？', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delAdmin({
        id: val.id
      }).then((res) => {
        if (res.data.status === 200) {
          getList({
            pageNum: queryInfo.value.pageNum,
            pageSize: queryInfo.value.pageSize
          })
          if (route.path === '/super') {
            log({
              username: localStorage.getItem('username'),
              log:
                '在管理管理员页面对' + val.username + '管理员进行了账户删除操作'
            }).then((res) => {
              if (res.data.status === 200) {
                // console.log('记录成功')
              } else {
                // console.log('记录失败')
              }
            })
          }
          ElMessage({ type: 'success', message: '删除成功', duration: 500 })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消'
      })
    })
}

const search = () => {
  searchAdmin({ username: input.value }).then((res) => {
    if (res.data.status === 200) {
      list.value = res.data.data
      total.value = res.data.total
      if (route.path === '/super') {
        log({
          username: localStorage.getItem('username'),
          log: '在管理管理员页面对' + input.value + '进行了搜索操作'
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

const rest = () => {
  location.reload()
  input.value = ''
  if (route.path === '/super') {
    log({
      username: localStorage.getItem('username'),
      log: '在管理管理员页面进行了重置操作'
    }).then((res) => {
      if (res.data.status === 200) {
        // console.log('记录成功')
      } else {
        // console.log('记录失败')
      }
    })
  }
}

const pageLog = ref({})
const checkLog = (val: any) => {
  pageLog.value = val
  getCheck(val)
}

const getCheck = (val: any) => {
  checkInfo({
    username: val.username,
    pageNum: queryLog.value.pageNum,
    pageSize: queryLog.value.pageSize
  }).then((res) => {
    if (res.data.status === 200) {
      logList.value = res.data.data
      queryLog.value.total = res.data.total
    } else {
      logList.value = []
    }
  })
}

const handleSizeChange2 = (val: number) => {
  queryLog.value.pageSize = val
  // console.log(`${val} items per page`)
}
const handleCurrentChange2 = (val: number) => {
  queryLog.value.pageNum = val
  getCheck(pageLog.value)
  // console.log(`current page: ${val}`)
}
</script>

<style scoped lang="less">
.super {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-input {
      width: 180px;
      height: 40px;
    }
    .el-button {
      height: 40px;
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

  .demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
  }
  .demo-pagination-block .demonstration {
    margin-bottom: 16px;
  }
}
</style>
