import axios from 'axios'
import { ElMessage, Message } from 'element-plus'
const serve = axios.create({

  baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : 'http://120.55.93.225:3000',
  timeout: 5000
})

serve.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

serve.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, err => {
  // 请求发生错误时的处理 抛出错误
  Promise.reject(err)
})
let timer = 0
serve.interceptors.response.use(config => {
  if (config.data.status == 401) {
    ElMessage({ message: '登录过期,请重新登录', type: 'error', duration: 1500 })
    clearTimeout(timer)

    timer = setTimeout(() => {
      window.localStorage.clear()
      window.location.reload()
    }, 1500)
  }

  return Promise.resolve(config)
}, err => {
  Promise.reject(err)
})

export default serve
