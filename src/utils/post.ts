import axios from '@/utils/axios'

export const login = (params:any) => {
  return axios({
    url: '/admin/login',
    method: 'post',
    data: params
  })
}

export const register = (params:any) => {
  return axios({
    url: '/admin/register',
    method: 'post',
    data: params
  })
}

export const delAdminUser = (params:any) => {
  return axios({
    url: '/admin/delAdminUser',
    method: 'post',
    data: params
  })
}

export const changeUserPassword = (params:any) => {
  return axios({
    url: '/admin/changeUserPassword',
    method: 'post',
    data: params
  })
}

export const checkAdminUser = (params:object) => {
  return axios({
    url: '/admin/checkAdminUser',
    method: 'post',
    data: params
  })
}

export const getAdminList = (params:object) => {
  return axios({
    url: '/admin/getAdminList',
    method: 'post',
    data: params
  })
}

export const upgrade = (params:object) => {
  return axios({
    url: '/admin/upgrade',
    method: 'post',
    data: params
  })
}

export const delAdmin = (params:object) => {
  return axios({
    url: '/admin/delAdmin',
    method: 'post',
    data: params
  })
}

export const log = (params:object) => {
  return axios({
    url: '/admin/log',
    method: 'post',
    data: params
  })
}

export const checkInfo = (params:object) => {
  return axios({
    url: '/admin/checkInfo',
    method: 'post',
    data: params
  })
}

export const changeAdmin = (params: object) => {
  return axios({
    url: '/admin/changeAdmin',
    method: 'post',
    data: params
  })
}

export const getOrderList = (params:object) => {
  return axios({
    url: '/admin/getOrderList',
    method: 'post',
    data: params
  })
}
// 发货
export const shipments = (params:object) => {
  return axios({
    url: '/admin/shipments',
    method: 'post',
    data: params
  })
}

export const avatar = (params:object) => {
  return axios({
    url: '/admin/update/avatar',
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const cover = (params: object) => { 
  return axios({
    url: '/admin/update/cover',
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }

  })
}

export const life = (params:object) => {
  return axios({
    url: '/admin/update/life',
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const newBuild = (params:object) => {
  return axios({
    url: '/admin/newUp',
    method: 'post',
    data: params
  })
}

export const topUpd = (params:object) => {
  return axios({
    url: '/admin/topUp',
    method: 'post',
    data: params
  })
}

export const changeShop = (params:object) => {
  return axios({
    url: '/admin/changeShop',
    method: 'post',
    data: params
  })
}

export const changeImg = (params:object) => {
  return axios({
    url: '/admin/changeImg',
    method: 'post',
    data: params
  })
}

export const changeSild = (params:object) => {
  return axios({
    url: '/admin/changeSild',
    method: 'post',
    data: params
  })
}

export const changeLife = (params:object) => {
  return axios({
    url: '/admin/changeLife',
    method: 'post',
    data: params
  })
}

// 新建特价商品
export const discountNewUp = (params:object) => {
  return axios({
    url: '/admin/discountNewUp',
    method: 'post',
    data: params
  })
}
// 修改特价商品信息
export const discountChangeShop = (params:object) => {
  return axios({
    url: '/admin/discountChangeShop',
    method: 'post',
    data: params
  })
}

// 更换特价宠物封面
export const discountChangeImg = (params:object) => {
  return axios({
    url: '/admin/discountChangeImg',
    method: 'post',
    data: params
  })
}
// 更换特价宠物轮播图

export const discountChangeSild = (params:object) => {
  return axios({
    url: '/admin/discountChangeSild',
    method: 'post',
    data: params
  })
}
// 更换特价宠物日常照
export const discountChangeLife = (params:object) => {
  return axios({
    url: '/admin/discountChangeLife',
    method: 'post',
    data: params
  })
}