import request from './request'
import mockRequest from './mockAjax'

// home三级联动的数据请求 /api/product/getBaseCategoryList
export const  reqCategoryList = () => request.get('/product/getBaseCategoryList')

// home组件mock请求的数据
export const reqBannerList = () => mockRequest.get('/banner')
export const reqFloorList = () => mockRequest.get('/floor')

// search模块的数据请求 params参数没有参数都要传递一个空数组，不然会获取不了数据
export const reqSearchInfo = (params) => request({url:'/list',method:'POST',data:params})

// 发送详情页的请求
export const reqGoodInfo = (skuid) => request({url:`/item/${skuid}`,method:'GET'})

// 发送添加或者修改购物车请求 /api/cart/addToCart/{ skuId }/{ skuNum }
export const addOrUpdateShopCar = (skuId,skuNum) => request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'POST'})

// 请求购物车数据
export const reqCartList = () => request({url:'/cart/cartList',method:'GET'})

// 删除购物车商品接口
export const deleteCartList = (skuId) => request({url:`/cart/deleteCart/${skuId}`,method:'DELETE'})

// 切换购物车商品选中
export const turnChecked = (skuId,isChecked) => request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'GET'})

// 注册页面 获得验证码请求
export const reqUserCode = (phone) => request({url:`/user/passport/sendCode/${phone}`,method:'GET'})

// 注册页面 注册用户
export const reqUserRegister = (data) => request({url:'/user/passport/register',data,method:'POST'})

// 登录页面 用户登录请求
export const reqUserLogin = (data) => request({url:'/user/passport/login',data,method:'POST'})

// 获取用户信息请求
export const reqUserInfo = () => request({url:'/user/passport/auth/getUserInfo',method:'GET'})

// 推出登录接口
export const reqUserLogout = () => request({url:'/user/passport/logout',method:'GET'})

//订单页面 请求用户地址
export const reqUserAddressInfo = () => request({url:'/user/userAddress/auth/findUserAddressList',method:'GET'})

// 订单页面 获得用户订单信息
export const reqUserTradeInfo = () => request({url:'/order/auth/trade',method:'GET'})

// 提交订单请求
export const reqSubmitUserOrder = (tradeNo,data) => request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'POST'})

// 获得订单支付信息
export const reqOrderPayInfo = (orderId) => request({url:`/payment/weixin/createNative/${orderId}`,method:'GET'})

// 获得支付结果信息
export const reqPayResultInfo = (orderId) => request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'GET'})

// 获得个人中心订单列表
export const reqUserOrderList = (page,limit) => request({url:`/order/auth/${page}/${limit}`,method:'GET'})