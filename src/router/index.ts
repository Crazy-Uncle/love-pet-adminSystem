import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import { ElMessage, type FormInstance } from 'element-plus'
const Index = () => import('@/views/Index.vue')
const userAdmin = () => import('@/views/userAdmin.vue')
const orderAdmin = () => import('@/views/orderAdmin.vue')
const hitShop = () => import('@/views/hitShop.vue')
const superAdmin = () => import('@/views/superAdmin.vue')
const Statistics = () => import('@/views/Statistics.vue')
const Login = () => import('@/views/Login.vue')
const inPl = () => import('@/views/dayDay.vue')
const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  {
    path: '/home',
    name: 'home',
    component: Index,
    children: [
      { path: '/user', component: userAdmin },
      { path: '/order', component: orderAdmin },
      { path: '/hit', component: hitShop },
      { path: '/super', component: superAdmin },
      { path: '/count', component: Statistics },
      { path: '/active', component: inPl }
    ]
  },

  { path: '/login', component: Login, name: 'login' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes

})

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')

  if (to.path === '/login') return next()
  if (!token) return next('/login')
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
