// axios的二次封装
import axios from 'axios'

// 引入nprogress进度条
import nProgress from 'nprogress'
import "nprogress/nprogress.css"
import store from 'store'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  nProgress.start()
  // 发送请求头，绑定用户数据
  if(store.state.detail.uuid_token){
    config.headers.userTempId = store.state.detail.uuid_token
  }

  // 进行绑定token
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }
  return config
}, err => {
  console.log(err);
})

// 响应拦截器
request.interceptors.response.use(res => {
  nProgress.done()
  return res.data
}, err => {
  return Promise.reject(new Error('Faile'))
})

export default request;