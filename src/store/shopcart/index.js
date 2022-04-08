import { reqCartList,deleteCartList,turnChecked } from "../../api/index.js"
const state = {
  cartList:[]
}
const mutations = {
  GETSHOPCART(state,cartList){
    state.cartList = cartList
  }
}
const actions = {
  async getShopCart({commit}){
    let result  = await reqCartList()
    if(result.code === 200){
      commit('GETSHOPCART',result.data)
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  async deleteShopCart({commit},skuId){
    let result = await deleteCartList(skuId)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  async turnShopListChecked({commit},{skuId,isChecked}){
    let result = await turnChecked(skuId,isChecked)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // context是指上下文包括commit state dispatch getters可以进行结构赋值
  deleteAllCheckedList({getters,dispatch}){
    // 需要调用上面的删除action来进行遍历操作 还需要对购物车的商品的id进行判断
    // 定义一个数组 方便进行异步返回 进行返回一个promise结果
    let promiseAll = []
    // 进行数组遍历，把每一个商品进行判断是否已经选中
    getters.cartList.cartInfoList.forEach(element => {
      // 如果调用的是dispatch则返回的是一个promise对象
      let promise = element.isChecked === 1 ? dispatch('deleteShopCart',element.skuId) : '';
      promiseAll.push(promise)
    });
    // 进行判断是否全部都执行成功 只有全部的promise对象成功才会执行成功
    return Promise.all(promiseAll)
  },
  isAllChecked({getters,dispatch},allChecked){
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      // 判断商品状态是否跟全选框状态一致
      let promise = item.isChecked != allChecked ? dispatch('turnShopListChecked',{skuId:item.skuId,isChecked:allChecked}) : '';
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartList(state){
    return state.cartList[0] || {}
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}