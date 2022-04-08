// axios的二次封装
import axios from 'axios'

// 引入nprogress进度条
import nProgress from 'nprogress'
import "nprogress/nprogress.css"

const request = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  nProgress.start()
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