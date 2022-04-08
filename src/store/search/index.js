import { reqSearchInfo } from "../../api"
const state = {
  searchList:{}
}
const mutations  ={
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList
  }
}
const actions = {
  async getSearchList({commit},params = {}){
    let result = await reqSearchInfo(params)
    if(result.code === 200){
      commit('GETSEARCHLIST',result.data)
    }
  }
}
// 使用计算属性进行数据简化，方便组件获取数据
const getters = {
  goodList(state){
    // 有可能state没有请求过来是空数组
    return state.searchList.goodsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList || []
  },
  attrsList(state){
    return state.searchList.attrsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}