import { reqGoodInfo, addOrUpdateShopCar } from "../../api"
import { getUUID } from "utils/uuid_token"
const state = {
  goodInfo: [],
  uuid_token: getUUID()
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  // 详情页信息的action
  async getGoodInfo({ commit }, skuid) {
    let result = await reqGoodInfo(skuid)
    if (result.code === 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 添加或者修改购物车
  async addOrUpdateShopCar({ commit }, { skuId, skuNum }) {
    let result = await addOrUpdateShopCar(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return new Error('faile')
    }
  }
}
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
