import { reqSubmitUserOrder, reqUserAddressInfo , reqUserTradeInfo } from "../../api"
const state = {
  userAddressInfo: [],
  userTradeInfo: {}
}
const mutations = {
  GETUSERADDRESS(state, userAddressInfo) {
    state.userAddressInfo = userAddressInfo
  },
  GETUSERTRADEINFO(state, userTradeInfo) {
    state.userTradeInfo = userTradeInfo
  }
}
const actions = {
  async getUserAddress({ commit }) {
    let result = await reqUserAddressInfo()
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getUserTradeInfo({ commit }) {
    let result = await reqUserTradeInfo()
    if (result.code == 200) {
      commit('GETUSERTRADEINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}