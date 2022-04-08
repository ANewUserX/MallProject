// 路由懒加载
const Home = () => import('views/home')
const Search = () => import('views/search')
const Login = () => import('views/login')
const Register = () => import('views/register')
const Detail = () => import('views/Detail')
const AddCartSuccess = () => import('views/AddCartSuccess')
const ShopCart = () => import('views/shopCart')
const Trade = () => import('views/trade')
const Pay = () => import('views/pay')
const PaySuccess = () => import('views/paySuccess')
const Center = () => import('views/center')
const MyOrder = () => import('views/center/myOrder')
const GroupOrder = () => import('views/center/groupOrder')
// 定义routes
const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      show: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      show: true
    }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    name: 'search',
    meta: {
      show: true
    },
    // 布尔值的方式只能传递params参数 props:true
    // 对象的方式，可以额外传递数据 props:{a:1,b:4}在组件中就可以 使用props来接受参数
    // 对象的方式 ($route) => ({keyword:this.$route.params.keyword,k:this.$route.query.k}) 
    // props:true
  },
  {
    path: '/login',
    component: Login,
    meta: {
      show: false
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      show: false
    }
  },
  {
    path:'/detail/:skuid',
    component:Detail,
    meta:{
      show:true
    }
  },
  {
    path:'/addcartsuccess',
    name:'addcartsuccess',
    component:AddCartSuccess,
    meta:{
      show:true
    }
  },
  {
    path:'/shopcart',
    name:'shopcart',
    component:ShopCart,
    meta:{
      show:true
    }
  },
  {
    path:'/trade',
    name:'trade',
    component:Trade,
    meta:{
      show:true
    },
    beforeEnter:(to,from,next) => {
      if(from.name === 'shopcart'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/pay',
    name:'pay',
    component:Pay,
    meta:{
      show:true
    },
    beforeEnter:(to,from,next) => {
      if(from.path === '/trade'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/paysuccess',
    name:'paysuccess',
    component:PaySuccess,
    meta:{
      show:true
    }
  },
  {
    path:'/center',
    name:'center',
    component:Center,
    meta:{
      show:true
    },
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  }
]

export default routes