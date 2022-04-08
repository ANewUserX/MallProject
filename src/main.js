import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

// 三级联动全局组件注册
import TypeNav from './components/typenav'
Vue.component(TypeNav.name, TypeNav)

// 轮播图全局组件注册
import Carousel from './components/carousel'
Vue.component(Carousel.name, Carousel)
// 导入轮播图模拟数据
import '@/mock/mockServe'
// 导入轮播图样式
import 'swiper/css/swiper.css'
import * as API from 'api'

// 分页器注册全局组件
import Pagination from 'components/pagination'
Vue.component(Pagination.name, Pagination)

import 'element-ui/lib/theme-chalk/index.css';
import { Button ,MessageBox } from 'element-ui'
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import fa from 'assets/faviocon.jpg'
Vue.use(VueLazyload, {
  // 默认未加载出来的背景图片
  loading: fa,
})

// 导入表单验证
import "@/plugins/validate"
Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
  // 全局事件总线$bus注册
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store
}).$mount('#app')
