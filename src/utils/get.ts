import axios from '@/utils/axios'

export const getUserList = (params:any) => {
  return axios({
    url: '/admin/getUserList',
    method: 'get',
    params: params
  })
}

export const adminUserSearch = (params:any) => {
  return axios({
    url: '/admin/adminUserSearch',
    method: 'get',
    params: params
  })
}

export const searchAdmin = (params:object) => {
  return axios({
    url: '/admin/searchAdmin',
    method: 'get',
    params: params
  })
}

export const getDetail = (params:object) => {
  return axios({
    url: '/admin/getDetail',
    method: 'get',
    params: params
  })
}

export const delOrders = (params:object) => {
  return axios({
    url: '/admin/delOrders',
    method: 'get',
    params: params
  })
}

// 获取商品列表
export const getShop = (params:object) => {
  return axios({
    url: '/admin/getShop',
    method: 'get',
    params: params
  })
}

// 增加库存
export const addRepertory = (params:object) => {
  return axios({
    url: '/admin/addRepertory',
    method: 'get',
    params: params
  })
}

// 删除商品
export const delShop = (params:object) => {
  return axios({
    url: '/admin/delShop',
    method: 'get',
    params: params
  })
}

export const searchShop = (params:object) => {
  return axios({
    url: '/admin/searchShop',
    method: 'get',
    params: params
  })
}
// 初始化特价数据
export const discountInit = (params:object) => {
  return axios({
    url: '/admin/discountInit',
    method: 'get',
    params: params
  })
}

// 修改特价库存
export const discountRepertory = (params:object) => {
  return axios({
    url: '/admin/discountRepertory',
    method: 'get',
    params: params
  })
}

// 删除特价商品
export const delDiscountShop = (params:object) => {
  return axios({
    url: '/admin/delDiscountShop',
    method: 'get',
    params: params
  })
}
// 搜索特价商品

export const discountSearchShop = (params:object) => {
  return axios({
    url: '/admin/discountSearchShop',
    method: 'get',
    params: params
  })
}

export const countOrder = () => {
  return axios({
    url: '/admin/countOrder',
    method: 'get'
  })
}

export const countWholeOrder = () => {
  return axios({
    url: '/admin/countWholeOrder',
    method: 'get'
  })
}

export const countPrice = () => {
  return axios({
    url: '/admin/countPrice',
    method: 'get'
  })
}