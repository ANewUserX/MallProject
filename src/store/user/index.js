import { reqUserCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "../../api"
import { setToken, getToken, removeToken } from "../../utils/user_token"
const state = {
  code: '',
  // 首先会从本地看一下是否存在
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  GETTOKEN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    state.token = removeToken()
    state.userInfo = {}
  }
}
const actions = {
  async getCode({ commit }, phone) {
    let result = await reqUserCode(phone)
    // 一般到这就结束了，后台会自动发送信息给用户，进行填写
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async userRegister({ commit }, data) {
    let result = await reqUserRegister(data)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    // 将token保存下来方便后续获取用户信息
    if (result.code == 200) {
      // 将路由存储在vuex中，但是不是永久性存储的，一刷新就会没有
      commit('GETTOKEN', result.data.token)
      // 将token进行本地存储
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async userLogout({ commit }) {
    // 推出登录，清空token和用户数据
    let result = await reqUserLogout()
    if (result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}