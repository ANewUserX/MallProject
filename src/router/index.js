import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

// 先保留一份
const originPush = VueRouter.prototype.push
// 重写push,replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (reject && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  // mode:'history',
  routes,
  // 定义路由跳转时路由滚动的位置
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y : 0 }
  },
})

// 使用全局路由守卫来监护路由的跳转 全局前置路由守卫
router.beforeEach(async (to,from,next) => {
  // to表示的是要去哪一个路由的信息
  // from表示的是从哪一个路由跳转的信息
  // next的调用 可以是next() 或者是next(path)指定跳转到哪一个路由
  next()
  // 判断用户是否登录 判断vuex中是否有token
  let token = store.state.user.token
  if(token){
    // 用户登录之后判断是否路由会跳转到登录页面
    if(to.path == '/login' || to.path == '/register'){
      // 将路由跳转到首页
      next('/home')
    }else{
      // 如果是去其他页面 判断是否有用户的信息
      if(store.state.user.userInfo.loginName){
        // 如果有则直接跳转
        next()
      }else{
        // 没有用户信息 需要发送请求获得用户信息
        try {
          // 等待请求成功结果
          await store.dispatch('getUserInfo')
          // 有结果则继续跳转
          next()
        } catch (error) {
          // 请求没有结果 失败 说明可能token 过期需要推出登录 重新登录获得用户信息
          store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  }else{
    // 未登录不能去交易相关的 支付相关的 个人中心 
    let toPath = to.path;
    if(toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('center') !== -1){
      // 跳转到登录页面 需要考虑的是点击个人页面应该登录后是去要去的页面 可以使用query保存数据
      // 到登录页面判断是否带有query参数
      next('/login?redirect='+toPath)
    }else{
      // 除上面的之外可以放行
      next()
    }
  }
})

export default router