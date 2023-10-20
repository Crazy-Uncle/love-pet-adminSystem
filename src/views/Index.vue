<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div>
          欢迎回来，<el-icon><User /></el-icon> {{ username }}
        </div>
        <router-link to="/user"
          ><el-icon><User /></el-icon> 用户管理</router-link
        >
        <router-link to="/super" v-if="flag"
          ><el-icon><UserFilled /></el-icon> 管理员</router-link
        >
        <router-link to="/order"
          ><el-icon><Memo /></el-icon> 订单管理</router-link
        >
        <router-link to="/hit"
          ><el-icon><Shop /></el-icon>
          商品管理
        </router-link>

        <router-link to="/active">
          <el-icon><Discount /></el-icon> 活动特价管理
        </router-link>

        <router-link to="/count"
          ><el-icon><Coin /></el-icon> 数据统计</router-link
        >
      </el-aside>
      <el-container>
        <el-header>
          <h4 class="logo">爱宠后台管理系统</h4>
          <el-dropdown>
            <el-button type="primary">
              状态：在线<svg
                t="1690635632881"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2371"
                width="32"
                height="32"
              >
                <path
                  d="M509.307 882.789c-101.843-1.355-191.665-38.323-264.177-113.515-73.87-76.601-108.256-169.529-103.345-275.76 4.514-97.635 42.734-181.368 113.24-248.939 76.832-73.634 169.755-107.954 275.959-102.872 97.454 4.663 181.046 42.927 248.467 113.37 73.586 76.882 107.858 169.826 102.722 276.02-4.706 97.288-42.986 180.695-113.206 248.13-71.46 68.628-157.761 102.518-259.66 103.566z m2.815-688.139c-87.436 0.861-162.687 31.664-224.315 93.02-57.2 56.947-88.603 126.775-92.48 207.61-4.479 93.42 26.619 174.42 92.38 240.71 56.843 57.301 126.737 88.664 207.567 92.56 93.574 4.51 174.699-26.647 241.03-92.597 57.34-57.01 88.625-127.052 92.362-208.068 4.305-93.289-26.748-174.22-92.564-240.21-61.407-61.572-136.856-92.177-223.98-93.025zM452.674 549.93a4709.49 4709.49 0 0 0-34.411-30.28c-4.716-4.107-9.312-8.463-14.508-11.876-9.405-6.182-19.834-7.451-29.953-2.267-17.748 9.092-16.022 32.43-6.003 42.68 6.454 6.603 13.522 12.612 20.369 18.828 8.295 7.532 16.611 15.043 24.983 22.489 14.378 12.789 28.865 25.458 43.193 38.302 8.44 7.566 17.466 13.62 29.485 12.162 8.39-1.019 16.189-4 21.166-11.136 9.754-13.981 19.046-28.288 28.467-42.501 19.437-29.327 38.835-58.68 58.245-88.024 19.933-30.136 39.942-60.223 59.749-90.44 9.099-13.883 2.333-33.578-13.106-39.022-13.033-4.597-25.926 0.193-33.244 11.625-13.205 20.626-26.84 40.975-40.317 61.425a23543.541 23543.541 0 0 1-34.905 52.838c-17.475 26.363-34.99 52.702-52.572 79.175-8.966-8.077-17.752-16.084-26.638-23.978z"
                  fill="#1AFA29"
                  p-id="2372"
                ></path>
              </svg>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="change">修改密码</el-dropdown-item>
                <el-dropdown-item @click="exit">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { changeAdmin } from '@/utils/post'
const route = useRoute()
// const router = useRouter()
const username = ref(localStorage.getItem('username'))
// const tableId = ref()
// 控制隐藏开关
const flag = ref(true)
const show = () => {
  if (localStorage.getItem('tab') !== '1') {
    flag.value = false
  } else {
    flag.value = true
  }
}
show()
const exit = () => {
  localStorage.clear()
  // router.push('/login')
  location.reload()
}

const change = () => {
  ElMessageBox.prompt('请输入您要修改的密码', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      changeAdmin({
        username: localStorage.getItem('username'),
        password: value
      }).then((res) => {
        if (res.data.status === 200) {
          ElMessage({ type: 'success', message: '修改成功', duration: 500 })
          exit()
        } else {
          ElMessage({ type: 'error', message: '修改失败', duration: 500 })
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
</script>

<style scoped lang="less">
.common-layout {
  width: 100%;
  height: 100vh; // background-color: aquamarine;
  .el-container {
    height: 100%;
    .el-aside {
      display: flex;
      background-color: #545c64;
      flex-direction: column;
      justify-content: space-evenly;

      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      div {
        color: #409eff;
      }

      a {
        display: flex;
        width: 100%;
        height: 80px;
        background-color: #545c64;
        align-items: center;
        justify-content: center;
        color: #ffff;
        text-decoration: none;
      }
      a:hover {
        background-color: #434a50;
      }
      .active {
        background-color: #409eff;
      }
      .el-menu {
        width: 100%;
        height: 100%;
      }
    }
    .el-main {
      // background-color: #ffff;
    }
    .el-header {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #409eff;
      height: 80px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .logo {
        width: 100%;
        height: 100px;
        display: flex;
        font-size: 20px;
        justify-content: center;
        align-items: center;
        color: #ffff;
      }
    }
  }
}
</style>
